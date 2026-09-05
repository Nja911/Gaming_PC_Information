import type { Guide } from "@/types";
import { guide1440p } from "./1440p-gaming";
import { guide1080p } from "./1080p-gaming";
import { guideRam } from "./how-much-ram-for-gaming";
import { researchedGuides } from "./researched";
import { marketSources } from "@/content/builds/researched";

const allGuides = [guide1080p, guide1440p, guideRam, ...researchedGuides];
const uniqueGuides = allGuides.filter(
  (guide, index, collection) => collection.findIndex((candidate) => candidate.slug === guide.slug) === index
);

export const guides: Guide[] = uniqueGuides.map((guide) => ({ ...guide, sources: guide.sources ?? marketSources }));

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}
