import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllBuildSlugs } from "@/content/builds";
import { getAllComponentSlugs } from "@/content/components";
import { getAllGuideSlugs } from "@/content/guides";
import { getAllComparisonSlugs } from "@/content/comparisons";

// Static-friendly sitemap: every entry here is added once when a new
// content file is registered in its content/index.ts — no manual sitemap
// maintenance required as the site grows.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/gaming-pc/builds`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/components`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/comparisons`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/editorial-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/methodology`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const buildRoutes: MetadataRoute.Sitemap = getAllBuildSlugs().map((slug) => ({
    url: `${SITE_URL}/gaming-pc/builds/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const componentRoutes: MetadataRoute.Sitemap = getAllComponentSlugs().map((slug) => ({
    url: `${SITE_URL}/components/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guideRoutes: MetadataRoute.Sitemap = getAllGuideSlugs().map((slug) => ({
    url: `${SITE_URL}/guides/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = getAllComparisonSlugs().map((slug) => ({
    url: `${SITE_URL}/comparisons/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...buildRoutes, ...componentRoutes, ...guideRoutes, ...comparisonRoutes];
}
