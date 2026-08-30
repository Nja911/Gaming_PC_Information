import type { Comparison } from "@/types";
import { amdVsIntel } from "./amd-vs-intel";
import { nvidiaVsAmdGpu } from "./nvidia-vs-amd-gpu";
import { researchedComparisons } from "./researched";
import { marketSources } from "@/content/builds/researched";

export const comparisons: Comparison[] = [amdVsIntel, nvidiaVsAmdGpu, ...researchedComparisons].map((comparison) => ({ ...comparison, sources: comparison.sources ?? marketSources }));

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
  return comparisons.map((c) => c.slug);
}
