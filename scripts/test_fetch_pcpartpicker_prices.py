import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from fetch_pcpartpicker_prices import apply_price_mode, candidate_price, choose_build, compatible, manual_price, reefapi_items, refresh_snapshot, to_inr


class PricingUpdaterTests(unittest.TestCase):
    def test_currency_conversion_uses_fixed_rate(self):
        self.assertEqual(to_inr(["USD", "100"]), 9500)
        self.assertEqual(to_inr(["INR", "1234"]), 1234)

    def test_candidate_matching_prefers_the_cheapest_matching_listing(self):
        candidate = {"id": "storage", "query": ["1TB", "NVMe"], "name": "1TB NVMe SSD"}
        items = [
            {"brand": "A", "model": "1TB NVMe", "price": ["INR", "7000"]},
            {"brand": "B", "model": "1TB NVMe", "price": ["INR", "5500"]},
        ]
        match = candidate_price(candidate, items)
        self.assertIsNotNone(match)
        self.assertEqual(match["low"], 5225)
        self.assertGreater(match["high"], match["low"])

    def test_candidate_matching_allows_missing_vendor_token_and_split_model_name(self):
        candidate = {"id": "cpu", "query": ["AMD", "9800X3D"], "name": "AMD Ryzen 7 9800X3D"}
        items = [{"model": "Ryzen 7 9800 X3D", "price": ["INR", "50000"]}]
        self.assertIsNotNone(candidate_price(candidate, items))

    def test_amd_cpu_query_does_not_match_intel_same_number(self):
        candidate = {"id": "cpu", "category": "CPU", "query": ["AMD", "7600"], "name": "AMD Ryzen 5 7600"}
        items = [
            {"brand": "Intel", "model": "Core i5-7600", "price": ["INR", "44000"]},
            {"brand": "AMD", "model": "Ryzen 5 7600", "price": ["INR", "18000"]},
        ]
        match = candidate_price(candidate, items)
        self.assertIsNotNone(match)
        self.assertEqual(match["matchedName"], "AMD Ryzen 5 7600")

    def test_candidate_matching_keeps_gpu_suffixes_exact(self):
        candidate = {"id": "gpu", "query": ["RX", "7900", "XT"], "name": "Radeon RX 7900 XT"}
        items = [{"model": "Radeon RX 7900 XTX", "price": ["INR", "100000"]}]
        self.assertIsNone(candidate_price(candidate, items))

    def test_gpu_matching_accepts_vendor_sku_family_number(self):
        candidate = {"id": "gpu", "category": "GPU", "query": ["RTX", "5090"], "name": "GeForce RTX 5090"}
        items = [{"brand": "Zotac", "model": "ZT-50901-10M", "price": ["USD", "1500"]}]
        self.assertIsNotNone(candidate_price(candidate, items))

    def test_zero_price_is_not_a_safe_match(self):
        candidate = {"id": "storage", "query": ["1TB", "NVMe"], "name": "1TB NVMe SSD"}
        self.assertIsNone(candidate_price(candidate, [{"brand": "A", "model": "1TB NVMe", "price": ["INR", "0"]}]))

    def test_used_platform_price_is_half_of_new_equivalent(self):
        price = {"candidateId": "cpu", "low": 12000, "high": 14000, "condition": "new"}
        used = apply_price_mode(price, "used")
        self.assertEqual((used["low"], used["high"]), (6000, 7000))
        self.assertEqual(used["originalPriceINR"], [12000, 14000])
        self.assertEqual(apply_price_mode(price, "new")["low"], 12000)

    def test_manual_price_is_new_and_keeps_source(self):
        candidate = {"id": "cpu", "name": "AMD Ryzen 7 9800X3D"}
        price = manual_price(candidate, {"cpu": {"priceINR": 46999, "sourceUrl": "https://example.com"}})
        self.assertLess(price["low"], 46999)
        self.assertGreater(price["high"], 46999)
        self.assertEqual(price["condition"], "new")
        self.assertEqual(price["sourceUrl"], "https://example.com")

    def test_retailer_price_uses_provider_metadata(self):
        candidate = {"id": "cpu", "name": "AMD Ryzen 5 5600"}
        price = manual_price(
            candidate,
            {"cpu": {"priceINR": 13790, "sourceName": "Amazon", "sourceUrl": "https://amazon.in/example"}},
            "Retailer price API",
        )
        self.assertEqual(price["sourceName"], "Amazon")
        self.assertEqual(price["sourceUrl"], "https://amazon.in/example")

    def test_reefapi_response_is_normalized_to_catalog_items(self):
        items = reefapi_items({"data": {"results": [
            {"title": "AMD Ryzen 5 5600 Processor", "price": 13790, "url": "https://flipkart.com/example", "in_stock": True},
            {"title": "Out of stock Ryzen 5 5600", "price": 12000, "in_stock": False},
        ]}})
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["price"], ["INR", 13790])

    def test_incompatible_gpu_and_psu_are_rejected(self):
        selection = {"GPU": {"minPsu": 750}, "PSU": {"wattage": 650}}
        self.assertFalse(compatible(selection, {"minPsu": 650}))

    def test_optimizer_selects_best_valid_combination_inside_band(self):
        candidates = {
            "slow": {"id": "slow", "category": "Storage", "performance": 1},
            "fast": {"id": "fast", "category": "Storage", "performance": 2},
        }
        prices = {
            "slow": {"candidateId": "slow", "low": 45000, "high": 45000, "condition": "new"},
            "fast": {"candidateId": "fast", "low": 50000, "high": 50000, "condition": "new"},
        }
        result = choose_build(
            "50000",
            {"budgetRangeINR": [30000, 70000], "minPsu": 0, "allowed": {"Storage": ["slow", "fast"]}},
            candidates,
            prices,
            50000,
        )
        self.assertEqual(result["components"]["Storage"]["candidateId"], "fast")
        self.assertEqual(result["budgetINR"], 50000)
        self.assertEqual(result["budgetRangeINR"], [30000, 70000])

    def test_combination_above_upper_band_is_published_as_out_of_band(self):
        candidates = {"part": {"id": "part", "category": "Storage", "performance": 1}}
        prices = {"part": {"candidateId": "part", "low": 70001, "high": 70001, "condition": "new"}}
        result = choose_build(
            "50000",
            {"budgetRangeINR": [30000, 70000], "minPsu": 0, "allowed": {"Storage": ["part"]}},
            candidates,
            prices,
            50000,
        )
        self.assertEqual(result["budgetStatus"], "out-of-band")
        self.assertFalse(result["withinBudget"])

    def test_active_route_manifest_has_exact_budget_list(self):
        manifest = json.loads(Path(__file__).parents[1].joinpath("src/content/pricing/targets.json").read_text(encoding="utf-8"))
        self.assertEqual(list(manifest["builds"]), ["50000", "80000", "100000", "150000", "200000", "275000", "330000", "450000", "600000"])

    def test_active_route_manifest_uses_twenty_thousand_budget_band(self):
        manifest = json.loads(Path(__file__).parents[1].joinpath("src/content/pricing/targets.json").read_text(encoding="utf-8"))
        for build_id, config in manifest["builds"].items():
            budget = int(build_id)
            self.assertEqual(config["budgetRangeINR"], [budget - 20000, budget + 20000])

    def test_only_the_highest_route_allows_rtx_5090(self):
        manifest = json.loads(Path(__file__).parents[1].joinpath("src/content/pricing/targets.json").read_text(encoding="utf-8"))
        routes = [build_id for build_id, config in manifest["builds"].items() if "gpu-5090" in config["allowed"].get("GPU", [])]
        self.assertEqual(routes, ["600000"])

    def test_failed_refresh_preserves_existing_snapshot(self):
        class BrokenAPI:
            def retrieve(self, *_args, **_kwargs):
                raise RuntimeError("network failure")

        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "latest.json"
            output.write_text("previous", encoding="utf-8")
            with self.assertRaises(RuntimeError):
                refresh_snapshot(
                    BrokenAPI(),
                    {"candidates": [{"id": "x", "category": "Storage", "query": ["x"], "name": "x"}], "builds": {"50000": {"budgetRangeINR": [30000, 70000], "minPsu": 0, "allowed": {"Storage": ["x"]}}}},
                    output,
                )
            self.assertEqual(output.read_text(encoding="utf-8"), "previous")


if __name__ == "__main__":
    unittest.main()
