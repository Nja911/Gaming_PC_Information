import type { GamingPCBuild } from "@/types";
import { build50000 } from "./50000";
import { build75000 } from "./75000";
import { build100000 } from "./100000";
import { build150000 } from "./150000";

// Adding a new budget tier is: create content/builds/<budget>.ts, import it
// here, and add it to this array. No route or component code changes needed.
export const builds: GamingPCBuild[] = [
  build50000,
  build75000,
  build100000,
  build150000,
].sort((a, b) => a.budget - b.budget);

export function getBuildBySlug(slug: string): GamingPCBuild | undefined {
  return builds.find((b) => b.slug === slug);
}

export function getAllBuildSlugs(): string[] {
  return builds.map((b) => b.slug);
}
