import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { builds } from "@/content/builds";
import { componentCategories } from "@/content/components";
import { guides } from "@/content/guides";
import { comparisons } from "@/content/comparisons";

const STATIC_CONTENT_DATE = "2026-08-30";

function latestDate(dates: string[]): Date {
  return new Date(
    dates.reduce(
      (latest, date) => (date > latest ? date : latest),
      STATIC_CONTENT_DATE,
    ),
  );
}

// Static-friendly sitemap: every entry here is added once when a new
// content file is registered in its content/index.ts — no manual sitemap
// maintenance required as the site grows.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(STATIC_CONTENT_DATE),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/gaming-pc/builds`,
      lastModified: latestDate(builds.map((build) => build.lastUpdated)),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/components`,
      lastModified: latestDate(
        componentCategories.map((category) => category.lastUpdated),
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified: latestDate(guides.map((guide) => guide.lastUpdated)),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/comparisons`,
      lastModified: latestDate(
        comparisons.map((comparison) => comparison.lastUpdated),
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(STATIC_CONTENT_DATE),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/editorial-policy`,
      lastModified: new Date(STATIC_CONTENT_DATE),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/methodology`,
      lastModified: new Date(STATIC_CONTENT_DATE),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(STATIC_CONTENT_DATE),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(STATIC_CONTENT_DATE),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const buildRoutes: MetadataRoute.Sitemap = builds.map((build) => ({
    url: `${SITE_URL}/gaming-pc/builds/${build.slug}`,
    lastModified: new Date(build.lastUpdated),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const componentRoutes: MetadataRoute.Sitemap = componentCategories.map(
    (category) => ({
      url: `${SITE_URL}/components/${category.slug}`,
      lastModified: new Date(category.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.lastUpdated),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map(
    (comparison) => ({
      url: `${SITE_URL}/comparisons/${comparison.slug}`,
      lastModified: new Date(comparison.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [
    ...staticRoutes,
    ...buildRoutes,
    ...componentRoutes,
    ...guideRoutes,
    ...comparisonRoutes,
  ];
}
