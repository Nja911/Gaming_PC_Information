"""Fetch curated PCPartPicker prices and atomically write the site snapshot."""

from __future__ import annotations

import argparse
import asyncio
import itertools
import json
import math
import re
import sys
import tempfile
from datetime import datetime, timezone
from decimal import Decimal
from pathlib import Path
from typing import Any

USD_TO_INR = Decimal("95")
CATEGORY_TYPES = {
    "CPU": "cpu",
    "GPU": "video-card",
    "Motherboard": "motherboard",
    "RAM": "memory",
    "Storage": "internal-hard-drive",
    "PSU": "power-supply",
    "Case": "case",
    "CPU Cooler": "cpu-cooler",
}


def project_root() -> Path:
    return Path(__file__).resolve().parents[1]


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def normalise(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def item_text(item: dict[str, Any]) -> str:
    values = [str(value) for key, value in item.items() if key not in {"price", "url"}]
    capacity = item.get("capacity")
    if isinstance(capacity, dict) and capacity.get("total"):
        gigabytes = capacity["total"] / 1_000_000_000
        values.extend((f"{gigabytes:g}gb", f"{gigabytes / 1000:g}tb"))
    module_size = item.get("module_size")
    if isinstance(module_size, dict) and module_size.get("total") and item.get("number_of_modules"):
        gigabytes = module_size["total"] * item["number_of_modules"] / 1_000_000_000
        values.append(f"{gigabytes:g}gb")
    if item.get("wattage"):
        values.append(f"{item['wattage']}w")
    if item.get("radiator_size"):
        values.append(f"{item['radiator_size']}mm")
    return normalise(" ".join(values))


def flatten_items(value: Any) -> list[dict[str, Any]]:
    if isinstance(value, list):
        return [item for child in value for item in flatten_items(child)]
    if isinstance(value, dict):
        if "price" in value and any(key in value for key in ("model", "name", "brand")):
            return [value]
        return [item for child in value.values() for item in flatten_items(child)]
    return []


def price_value(value: Any) -> tuple[str, Decimal] | None:
    if isinstance(value, dict):
        currency = value.get("currency") or value.get("code")
        amount = value.get("amount") or value.get("value")
        if currency and amount is not None:
            return str(currency).upper(), Decimal(str(amount))
    if isinstance(value, (list, tuple)) and len(value) == 2:
        return str(value[0]).upper(), Decimal(str(value[1]))
    return None


def to_inr(value: Any) -> int:
    parsed = price_value(value)
    if not parsed:
        raise ValueError(f"Unsupported price value: {value!r}")
    currency, amount = parsed
    if currency in {"INR", "RS", "₹"}:
        return int(amount.quantize(Decimal("1")))
    if currency in {"USD", "$"}:
        return int((amount * USD_TO_INR).quantize(Decimal("1")))
    raise ValueError(f"Unsupported currency from PCPartPicker: {currency}")


def product_name(item: dict[str, Any]) -> str:
    brand = str(item.get("brand", "")).strip()
    model = str(item.get("model") or item.get("name") or "").strip()
    return " ".join(part for part in (brand, model) if part)


def product_url(item: dict[str, Any]) -> str | None:
    for key in ("url", "product_url", "link"):
        if item.get(key):
            return str(item[key])
    return None


def candidate_price(candidate: dict[str, Any], items: list[dict[str, Any]], source_name: str = "PCPartPicker India") -> dict[str, Any] | None:
    terms = [normalise(term) for term in candidate["query"]]
    matches: list[tuple[int, int, dict[str, Any]]] = []
    for item in items:
        text = item_text(item)
        matched = sum(1 for term in terms if term and term in text)
        required = max(1, math.ceil(len(terms) * 0.6))
        if matched < required:
            continue
        try:
            parsed_price = price_value(item["price"])
            if not parsed_price or parsed_price[1] <= 0:
                continue
            price = to_inr(item["price"])
        except (KeyError, ValueError):
            continue
        matches.append((matched, price, item))
    if not matches:
        return None
    matches.sort(key=lambda row: (-row[0], row[1]))
    _, price, item = matches[0]
    return {
        "candidateId": candidate["id"],
        "name": candidate["name"],
        "low": price,
        "high": price,
        "matchedName": product_name(item),
        "sourceUrl": product_url(item),
        "sourceName": source_name,
    }


def compatible(selection: dict[str, dict[str, Any]], build: dict[str, Any]) -> bool:
    cpu = selection.get("CPU")
    motherboard = selection.get("Motherboard")
    ram = selection.get("RAM")
    gpu = selection.get("GPU")
    psu = selection.get("PSU")
    case = selection.get("Case")

    if cpu and motherboard and cpu.get("platform") != motherboard.get("platform"):
        return False
    if motherboard and ram and motherboard.get("memoryType") != ram.get("memoryType"):
        return False
    if gpu and psu and psu.get("wattage", 0) < gpu.get("minPsu", 0):
        return False
    if psu and psu.get("wattage", 0) < build.get("minPsu", 0):
        return False
    if case and motherboard and case.get("formFactor") != motherboard.get("formFactor", "ATX"):
        return False
    if gpu and case and gpu.get("length") and case.get("maxGpuLength") and gpu["length"] > case["maxGpuLength"]:
        return False
    return True


def round_budget(amount: int) -> int:
    return math.ceil(amount / 5000) * 5000


def choose_build(build_id: str, config: dict[str, Any], candidates: dict[str, dict[str, Any]], prices: dict[str, dict[str, Any]], base_budget: int) -> dict[str, Any]:
    options: dict[str, list[dict[str, Any]]] = {}
    for category, ids in config["allowed"].items():
        if not ids:
            continue
        available = [candidates[candidate_id] | {"price": prices[candidate_id]} for candidate_id in ids if candidate_id in prices]
        if not available:
            raise RuntimeError(f"No current prices matched {build_id}/{category}")
        options[category] = available

    categories = list(options)
    combinations = []
    for values in itertools.product(*(options[category] for category in categories)):
        selection = dict(zip(categories, values))
        if not compatible(selection, config):
            continue
        total_high = config["fixedTotalINR"][1] + sum(item["price"]["high"] for item in values)
        total_low = config["fixedTotalINR"][0] + sum(item["price"]["low"] for item in values)
        combinations.append((selection, total_low, total_high))
    if not combinations:
        raise RuntimeError(f"No compatible current combination exists for build {build_id}")

    baseline_high = max(
        config["fixedTotalINR"][1],
        config["fixedTotalINR"][1] + sum(options[category][0]["price"]["high"] for category in categories),
    )
    ceiling = max(base_budget, round_budget(baseline_high))
    within_budget = [entry for entry in combinations if entry[2] <= ceiling]
    pool = within_budget or combinations
    selection, total_low, total_high = max(
        pool,
        key=lambda entry: (
            entry[0].get("GPU", {}).get("performance", 0),
            entry[0].get("CPU", {}).get("performance", 0),
            sum(item.get("performance", 0) for item in entry[0].values()),
            -entry[2],
        ),
    )

    return {
        "requiredBudgetINR": max(base_budget, round_budget(total_high)),
        "totalINR": [total_low, total_high],
        "components": {
            category: item["price"] for category, item in selection.items()
        },
    }


def build_snapshot(api: Any, manifest: dict[str, Any], fallback_api: Any | None = None) -> dict[str, Any]:
    candidates = {candidate["id"]: candidate for candidate in manifest["candidates"]}
    needed = {candidate_id for build in manifest["builds"].values() for ids in build["allowed"].values() for candidate_id in ids}
    catalogs: dict[str, list[dict[str, Any]]] = {}
    for part_type in {CATEGORY_TYPES[candidates[candidate_id]["category"]] for candidate_id in needed}:
        part_data = api.retrieve(part_type, force_refresh=True)
        payload = json.loads(part_data.to_json()) if hasattr(part_data, "to_json") else part_data
        catalogs[part_type] = flatten_items(payload)

    prices: dict[str, dict[str, Any]] = {}
    missing: list[str] = []
    for candidate_id in needed:
        candidate = candidates[candidate_id]
        match = candidate_price(candidate, catalogs[CATEGORY_TYPES[candidate["category"]]])
        if match:
            prices[candidate_id] = match
        else:
            missing.append(candidate_id)
    if fallback_api and missing:
        fallback_catalogs: dict[str, list[dict[str, Any]]] = {}
        fallback_types = {CATEGORY_TYPES[candidates[candidate_id]["category"]] for candidate_id in missing}
        for part_type in fallback_types:
            part_data = fallback_api.retrieve(part_type, force_refresh=True)
            payload = json.loads(part_data.to_json()) if hasattr(part_data, "to_json") else part_data
            fallback_catalogs[part_type] = flatten_items(payload)
        for candidate_id in list(missing):
            candidate = candidates[candidate_id]
            match = candidate_price(candidate, fallback_catalogs[CATEGORY_TYPES[candidate["category"]]], "PCPartPicker USD fallback")
            if match:
                prices[candidate_id] = match
                missing.remove(candidate_id)
    if not prices:
        raise RuntimeError("No safe PCPartPicker candidate matches")

    builds: dict[str, dict[str, Any]] = {}
    unresolved: list[str] = []
    for build_id, config in manifest["builds"].items():
        try:
            builds[build_id] = choose_build(build_id, config, candidates, prices, int(build_id))
        except RuntimeError:
            unresolved.append(build_id)
    if not builds:
        raise RuntimeError("No build had enough safe current matches")
    return {
        "schemaVersion": 1,
        "source": {"name": "PCPartPicker", "region": "in", "fallbackRegion": "us", "usdToInr": int(USD_TO_INR)},
        "checkedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "builds": builds,
        "unresolvedBuilds": unresolved,
    }


def write_atomic(path: Path, snapshot: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", dir=path.parent, delete=False) as handle:
        json.dump(snapshot, handle, indent=2)
        handle.write("\n")
        temporary = Path(handle.name)
    temporary.replace(path)


def refresh_snapshot(api: Any, manifest: dict[str, Any], output: Path, fallback_api: Any | None = None) -> dict[str, Any]:
    snapshot = build_snapshot(api, manifest, fallback_api)
    write_atomic(output, snapshot)
    return snapshot


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=project_root() / "src/content/pricing/latest.json")
    parser.add_argument("--manifest", type=Path, default=project_root() / "src/content/pricing/targets.json")
    args = parser.parse_args()
    try:
        from pcpartpicker import API

        asyncio.set_event_loop(asyncio.new_event_loop())
        snapshot = refresh_snapshot(API("in"), load_json(args.manifest), args.output, API("us"))
        print(f"Wrote {len(snapshot['builds'])} build recommendations checked at {snapshot['checkedAt']}")
        return 0
    except Exception as error:  # Keep the previous snapshot intact on every failure.
        print(f"Price refresh failed; previous snapshot was preserved: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
