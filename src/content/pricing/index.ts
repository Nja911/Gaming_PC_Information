import rawSnapshot from "./latest.json";
import type { PricingSnapshot } from "@/types";

export const pricingSnapshot = rawSnapshot as unknown as PricingSnapshot;

export function getBuildPricing(slug: string) {
  return pricingSnapshot.builds[slug];
}
