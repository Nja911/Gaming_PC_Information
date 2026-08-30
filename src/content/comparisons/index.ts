import type { Comparison } from "@/types";
import { amdVsIntel } from "./amd-vs-intel";
import { nvidiaVsAmdGpu } from "./nvidia-vs-amd-gpu";

export const comparisons: Comparison[] = [amdVsIntel, nvidiaVsAmdGpu];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
  return comparisons.map((c) => c.slug);
}
