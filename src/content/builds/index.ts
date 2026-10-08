import type { GamingPCBuild } from "@/types";
import { researchedBuilds } from "./researched";
import { resolveBuild } from "@/lib/pricing";

// Adding a new budget tier is: create content/builds/<budget>.ts, import it
// here, and add it to this array. No route or component code changes needed.
export const builds: GamingPCBuild[] = researchedBuilds.map(resolveBuild).sort((a, b) => a.budget - b.budget);

export function getBuildBySlug(slug: string): GamingPCBuild | undefined {
  return builds.find((b) => b.slug === slug);
}

export function getAllBuildSlugs(): string[] {
  return builds.map((b) => b.slug);
}
