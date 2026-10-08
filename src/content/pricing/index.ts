import rawSnapshot from "./latest.json";
import type { PricingSnapshot } from "@/types";

export const pricingSnapshot = rawSnapshot as unknown as PricingSnapshot;

export function getBuildPricing(slug: string) {
  const pricing = pricingSnapshot.builds[slug];
  if (!pricing || !pricing.budgetINR || !pricing.budgetRangeINR || !pricing.totalINR) return undefined;
  return pricing;
}
