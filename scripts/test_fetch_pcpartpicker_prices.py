import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from fetch_pcpartpicker_prices import candidate_price, choose_build, compatible, refresh_snapshot, to_inr


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
        self.assertEqual(match["low"], 5500)

    def test_zero_price_is_not_a_safe_match(self):
        candidate = {"id": "storage", "query": ["1TB", "NVMe"], "name": "1TB NVMe SSD"}
        self.assertIsNone(candidate_price(candidate, [{"brand": "A", "model": "1TB NVMe", "price": ["INR", "0"]}]))

    def test_incompatible_gpu_and_psu_are_rejected(self):
        selection = {
            "GPU": {"minPsu": 750},
            "PSU": {"wattage": 650},
        }
        self.assertFalse(compatible(selection, {"minPsu": 650}))

    def test_optimizer_can_replace_a_new_part_and_rounds_budget(self):
        candidates = {
            "slow": {"id": "slow", "category": "Storage", "performance": 1},
            "fast": {"id": "fast", "category": "Storage", "performance": 2},
        }
        prices = {
            "slow": {"candidateId": "slow", "low": 1000, "high": 1000},
            "fast": {"candidateId": "fast", "low": 2400, "high": 2400},
        }
        result = choose_build(
            "50000",
            {"fixedTotalINR": [0, 0], "minPsu": 0, "allowed": {"Storage": ["slow", "fast"]}},
            candidates,
            prices,
            50000,
        )
        self.assertEqual(result["components"]["Storage"]["candidateId"], "fast")
        self.assertEqual(result["requiredBudgetINR"], 50000)

    def test_expensive_new_parts_raise_required_budget(self):
        candidates = {"part": {"id": "part", "category": "Storage", "performance": 1}}
        prices = {"part": {"candidateId": "part", "low": 50001, "high": 50001}}
        result = choose_build(
            "50000",
            {"fixedTotalINR": [0, 0], "minPsu": 0, "allowed": {"Storage": ["part"]}},
            candidates,
            prices,
            50000,
        )
        self.assertEqual(result["requiredBudgetINR"], 55000)

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
                    {
                        "candidates": [{"id": "x", "category": "Storage", "query": ["x"], "name": "x"}],
                        "builds": {"50000": {"fixedTotalINR": [0, 0], "minPsu": 0, "allowed": {"Storage": ["x"]}}},
                    },
                    output,
                )
            self.assertEqual(output.read_text(encoding="utf-8"), "previous")


if __name__ == "__main__":
    unittest.main()
