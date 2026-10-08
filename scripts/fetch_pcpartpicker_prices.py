"""Fetch current PCPartPicker prices and publish only compatible budget builds."""

from __future__ import annotations

import argparse
import asyncio
import itertools
import json
import re
import sys
import tempfile
from datetime import datetime, timezone
from decimal import Decimal, ROUND_DOWN, ROUND_HALF_UP, ROUND_UP
from pathlib import Path
from typing import Any

USD_TO_INR = Decimal("95")
USED_FACTOR = Decimal("0.5")
ESTIMATE_MARGIN = Decimal("0.05")
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
VENDOR_QUERY_TERMS = {"amd", "intel", "nvidia", "geforce", "radeon", "rtx", "gtx", "rx"}


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
    for key, suffix in (("wattage", "w"), ("radiator_size", "mm")):
        if item.get(key):
            values.append(f"{item[key]}{suffix}")
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
        return int(amount.quantize(Decimal("1"), rounding=ROUND_HALF_UP))
    if currency in {"USD", "$"}:
        return int((amount * USD_TO_INR).quantize(Decimal("1"), rounding=ROUND_HALF_UP))
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


def estimated_range(amount: int) -> tuple[int, int]:
    value = Decimal(amount)
    low = int((value * (Decimal("1") - ESTIMATE_MARGIN)).quantize(Decimal("100"), rounding=ROUND_DOWN))
    high = int((value * (Decimal("1") + ESTIMATE_MARGIN)).quantize(Decimal("100"), rounding=ROUND_UP))
    return low, max(low + 100, high)


def query_term_present(term: str, tokens: list[str], allow_numeric_suffix: bool = False) -> bool:
    if term in tokens:
        return True
    if allow_numeric_suffix and term.isdigit() and any(token.startswith(term) and len(token) <= len(term) + 2 for token in tokens):
        return True
    for index in range(len(tokens) - 1):
        if "".join(tokens[index : index + 2]) == term:
            return True
    return False


def candidate_price(candidate: dict[str, Any], items: list[dict[str, Any]], source_name: str = "PCPartPicker India") -> dict[str, Any] | None:
    terms = [normalise(term) for term in candidate["query"]]
    matches: list[tuple[int, int, dict[str, Any]]] = []
    model_terms = [term for term in terms if term not in VENDOR_QUERY_TERMS]
    required_terms = model_terms or terms
    allow_numeric_suffix = candidate.get("category") == "GPU"
    for item in items:
        text = item_text(item)
        tokens = text.split()
        if not all(query_term_present(term, tokens, allow_numeric_suffix) for term in required_terms if term):
            continue
        matched = sum(1 for term in terms if term and query_term_present(term, tokens, allow_numeric_suffix))
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
    best_score = matches[0][0]
    best_matches = [match for match in matches if match[0] == best_score]
    prices = [match[1] for match in best_matches]
    low, high = (min(prices), max(prices)) if len(set(prices)) > 1 else estimated_range(prices[0])
    _, _, item = min(best_matches, key=lambda row: row[1])
    source_name = source_name if len(set(prices)) > 1 else f"{source_name} (±5% estimate)"
    return {
        "candidateId": candidate["id"],
        "name": candidate["name"],
        "low": low,
        "high": high,
        "matchedName": product_name(item),
        "sourceUrl": product_url(item),
        "sourceName": source_name,
        "condition": "new",
    }


def manual_price(candidate: dict[str, Any], overrides: dict[str, Any]) -> dict[str, Any] | None:
    override = overrides.get(candidate["id"])
    if not isinstance(override, dict):
        return None
    amount = override.get("priceINR")
    if not isinstance(amount, (int, float)) or amount <= 0:
        return None
    price = int(Decimal(str(amount)).quantize(Decimal("1"), rounding=ROUND_HALF_UP))
    low, high = override.get("rangeINR", estimated_range(price))
    if not isinstance(low, int) or not isinstance(high, int) or low <= 0 or high < low:
        low, high = estimated_range(price)
    return {
        "candidateId": candidate["id"],
        "name": candidate["name"],
        "low": low,
        "high": high,
        "matchedName": candidate["name"],
        "sourceUrl": override.get("sourceUrl"),
        "sourceName": "Manual user-supplied rough price (±5% estimate)",
        "condition": "new",
    }


def apply_price_mode(price: dict[str, Any], mode: str) -> dict[str, Any]:
    if mode != "used":
        return price
    low = int((Decimal(price["low"]) * USED_FACTOR).quantize(Decimal("1"), rounding=ROUND_HALF_UP))
    high = int((Decimal(price["high"]) * USED_FACTOR).quantize(Decimal("1"), rounding=ROUND_HALF_UP))
    return {
        **price,
        "low": low,
        "high": high,
        "condition": "used",
        "originalPriceINR": [price["low"], price["high"]],
        "usedFactor": float(USED_FACTOR),
    }


def ensure_component_range(component: dict[str, Any]) -> None:
    if component.get("low") != component.get("high"):
        return
    if component.get("condition") == "used" and isinstance(component.get("originalPriceINR"), list) and len(component["originalPriceINR"]) == 2:
        original = int(component["originalPriceINR"][0])
        original_low, original_high = estimated_range(original)
        component["originalPriceINR"] = [original_low, original_high]
        component["low"] = int((Decimal(original_low) * USED_FACTOR).quantize(Decimal("1"), rounding=ROUND_HALF_UP))
        component["high"] = int((Decimal(original_high) * USED_FACTOR).quantize(Decimal("1"), rounding=ROUND_HALF_UP))
    else:
        component["low"], component["high"] = estimated_range(int(component["low"]))
    source_name = str(component.get("sourceName", ""))
    if "estimate" not in source_name.lower():
        component["sourceName"] = f"{source_name} (±5% estimate)".strip()


def ensure_build_ranges(build: dict[str, Any]) -> None:
    components = build.get("components", {})
    for component in components.values():
        if isinstance(component, dict):
            ensure_component_range(component)
    build["totalINR"] = [
        sum(int(component["low"]) for component in components.values()),
        sum(int(component["high"]) for component in components.values()),
    ]


def compatible(selection: dict[str, dict[str, Any]], build: dict[str, Any]) -> bool:
    cpu = selection.get("CPU")
    motherboard = selection.get("Motherboard")
    ram = selection.get("RAM")
    gpu = selection.get("GPU")
    psu = selection.get("PSU")
    case = selection.get("Case")
    cooler = selection.get("CPU Cooler")

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
    if cooler and cpu and cooler.get("platform") not in (None, "any", cpu.get("platform")):
        return False
    return True


def choose_build(build_id: str, config: dict[str, Any], candidates: dict[str, dict[str, Any]], prices: dict[str, dict[str, Any]], base_budget: int) -> dict[str, Any]:
    options: dict[str, list[dict[str, Any]]] = {}
    price_modes = config.get("priceModes", {})
    for category, ids in config["allowed"].items():
        if not ids:
            continue
        available = []
        for candidate_id in ids:
            if candidate_id not in prices:
                continue
            candidate = candidates[candidate_id]
            available.append(candidate | {"price": apply_price_mode(prices[candidate_id], price_modes.get(category, "new"))})
        if not available:
            raise RuntimeError(f"No current prices matched {build_id}/{category}")
        options[category] = available

    categories = list(options)
    combinations: list[tuple[dict[str, dict[str, Any]], int, int]] = []
    for values in itertools.product(*(options[category] for category in categories)):
        selection = dict(zip(categories, values))
        if not compatible(selection, config):
            continue
        total_low = sum(item["price"]["low"] for item in values)
        total_high = sum(item["price"]["high"] for item in values)
        combinations.append((selection, total_low, total_high))
    if not combinations:
        raise RuntimeError(f"No compatible current combination exists for build {build_id}")

    budget_range = config.get("budgetRangeINR", [base_budget - 20000, base_budget + 20000])
    within_budget = [entry for entry in combinations if budget_range[0] <= entry[2] <= budget_range[1]]
    if not within_budget:
        raise RuntimeError(f"No current combination fits {build_id} within ₹{budget_range[0]}–₹{budget_range[1]}")

    selection, total_low, total_high = max(
        within_budget,
        key=lambda entry: (
            sum(item.get("performance", 0) for item in entry[0].values()),
            entry[0].get("GPU", {}).get("performance", 0),
            entry[0].get("CPU", {}).get("performance", 0),
            entry[0].get("Motherboard", {}).get("performance", 0),
            -abs(entry[2] - base_budget),
            -entry[2],
        ),
    )
    return {
        "budgetINR": base_budget,
        "budgetRangeINR": budget_range,
        "totalINR": [total_low, total_high],
        "components": {category: item["price"] for category, item in selection.items()},
    }


def retrieve_catalogs(
    api: Any,
    candidates: dict[str, dict[str, Any]],
    needed: set[str],
    *,
    force_refresh: bool = True,
    label: str = "India",
    diagnose: bool = False,
) -> dict[str, list[dict[str, Any]]]:
    catalogs: dict[str, list[dict[str, Any]]] = {}
    part_types = sorted({CATEGORY_TYPES[candidates[candidate_id]["category"]] for candidate_id in needed})
    for index, part_type in enumerate(part_types, start=1):
        print(f"Fetching {label} catalog {index}/{len(part_types)}: {part_type}", flush=True)
        part_data = api.retrieve(part_type, force_refresh=force_refresh)
        payload = json.loads(part_data.to_json()) if hasattr(part_data, "to_json") else part_data
        catalogs[part_type] = flatten_items(payload)
        if diagnose:
            samples = [f"{product_name(item)} ({item.get('price')})" for item in catalogs[part_type][:5]]
            print(f"{label} {part_type}: {len(catalogs[part_type])} items; samples: {' | '.join(samples)}", flush=True)
            focus_terms = {
                "cpu": ("5600", "5700", "7800", "7950", "9800", "9950", "x3d"),
                "video-card": ("4060", "4070", "4080", "4090", "5070", "5080", "5090", "7900", "9070"),
            }.get(part_type, ())
            if focus_terms:
                focused = [
                    f"{product_name(item)} ({item.get('price')})"
                    for item in catalogs[part_type]
                    if any(term in normalise(product_name(item)) for term in focus_terms) and price_value(item.get("price")) and price_value(item["price"])[1] > 0
                ][:20]
                print(f"{label} {part_type} focused: {' | '.join(focused) or 'none'}", flush=True)
    return catalogs


def build_snapshot(
    api: Any,
    manifest: dict[str, Any],
    fallback_api: Any | None = None,
    previous: dict[str, Any] | None = None,
    diagnose: bool = False,
    manual_overrides: dict[str, Any] | None = None,
) -> dict[str, Any]:
    candidates = {candidate["id"]: candidate for candidate in manifest["candidates"]}
    needed = {candidate_id for build in manifest["builds"].values() for ids in build["allowed"].values() for candidate_id in ids}
    catalogs = retrieve_catalogs(api, candidates, needed, label="India", diagnose=diagnose)
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
        fallback_catalogs = retrieve_catalogs(
            fallback_api,
            candidates,
            set(missing),
            force_refresh=False,
            label="USD fallback",
            diagnose=diagnose,
        )
        for candidate_id in list(missing):
            candidate = candidates[candidate_id]
            match = candidate_price(candidate, fallback_catalogs[CATEGORY_TYPES[candidate["category"]]], "PCPartPicker USD fallback")
            if match:
                prices[candidate_id] = match
                missing.remove(candidate_id)
    for candidate_id in list(missing):
        match = manual_price(candidates[candidate_id], manual_overrides or {})
        if match:
            prices[candidate_id] = match
            missing.remove(candidate_id)
    print(f"Matched {len(prices)}/{len(needed)} curated candidates", flush=True)
    if missing:
        print(f"Unmatched candidates: {', '.join(sorted(missing))}", file=sys.stderr, flush=True)
        if diagnose:
            for candidate_id in sorted(missing):
                candidate = candidates[candidate_id]
                if candidate["category"] not in {"CPU", "GPU"}:
                    continue
                model_terms = [normalise(term) for term in candidate["query"] if normalise(term) not in VENDOR_QUERY_TERMS]
                items = catalogs[CATEGORY_TYPES[candidate["category"]]]
                related = [
                    f"{product_name(item)} ({item.get('price')})"
                    for item in items
                    if any(term and term in normalise(product_name(item)) for term in model_terms)
                ][:3]
                print(f"Diagnostics {candidate_id}: {' | '.join(related) or 'no name similarity'}", file=sys.stderr, flush=True)
    if not prices:
        raise RuntimeError("No safe PCPartPicker candidate matches")

    builds: dict[str, dict[str, Any]] = {}
    unresolved: list[str] = []
    unresolved_reasons: dict[str, str] = {}
    for build_id, config in manifest["builds"].items():
        try:
            builds[build_id] = choose_build(build_id, config, candidates, prices, int(build_id))
        except RuntimeError as error:
            unresolved.append(build_id)
            unresolved_reasons[build_id] = str(error)
            previous_build = (previous or {}).get("builds", {}).get(build_id)
            if isinstance(previous_build, dict) and {"budgetINR", "budgetRangeINR", "totalINR", "components"}.issubset(previous_build):
                builds[build_id] = previous_build
    for build_id, reason in unresolved_reasons.items():
        print(f"Unresolved {build_id}: {reason}", file=sys.stderr, flush=True)
    for build in builds.values():
        ensure_build_ranges(build)
    if not builds:
        raise RuntimeError("No build had enough safe current matches")
    return {
        "schemaVersion": 2,
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


def refresh_snapshot(
    api: Any,
    manifest: dict[str, Any],
    output: Path,
    fallback_api: Any | None = None,
    diagnose: bool = False,
    manual_overrides: dict[str, Any] | None = None,
) -> dict[str, Any]:
    previous = None
    if output.exists():
        try:
            previous = load_json(output)
        except (OSError, json.JSONDecodeError):
            previous = None
    snapshot = build_snapshot(api, manifest, fallback_api, previous, diagnose, manual_overrides)
    write_atomic(output, snapshot)
    return snapshot


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=project_root() / "src/content/pricing/latest.json")
    parser.add_argument("--manifest", type=Path, default=project_root() / "src/content/pricing/targets.json")
    parser.add_argument(
        "--with-us-fallback",
        action="store_true",
        help="Also scan the slower PCPartPicker US catalog for candidates missing in India.",
    )
    parser.add_argument("--diagnose", action="store_true", help="Print sample catalog entries while debugging matches.")
    args = parser.parse_args()
    try:
        from pcpartpicker import API

        asyncio.set_event_loop(asyncio.new_event_loop())
        fallback_api = API("us") if args.with_us_fallback else None
        manual_path = project_root() / "src/content/pricing/manual-overrides.json"
        manual_overrides = load_json(manual_path) if manual_path.exists() else {}
        snapshot = refresh_snapshot(
            API("in"),
            load_json(args.manifest),
            args.output,
            fallback_api,
            args.diagnose,
            manual_overrides,
        )
        print(f"Wrote {len(snapshot['builds'])} build recommendations checked at {snapshot['checkedAt']}")
        if snapshot.get("unresolvedBuilds"):
            print(f"Unresolved tiers: {', '.join(snapshot['unresolvedBuilds'])}", file=sys.stderr)
        return 0
    except KeyboardInterrupt:
        print("Price refresh cancelled; previous snapshot was preserved.", file=sys.stderr)
        return 130
    except Exception as error:  # Keep the previous snapshot intact on every failure.
        print(f"Price refresh failed; previous snapshot was preserved: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
