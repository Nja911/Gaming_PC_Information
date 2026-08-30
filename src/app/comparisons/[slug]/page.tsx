import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata, generateArticleSchema, jsonLd, formatINR } from "@/lib/seo";
import { getComparisonBySlug, getAllComparisonSlugs } from "@/content/comparisons";
import { builds } from "@/content/builds";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ComparisonLayout from "@/components/comparisons/ComparisonCard";
import FAQ from "@/components/ui/FAQ";
import { RelatedContent, LastUpdated } from "@/components/ui/Meta";

export function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};
  return pageMetadata({
    title: comparison.title,
    description: comparison.metaDescription,
    path: `/comparisons/${comparison.slug}`,
  });
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  const relatedBuilds = builds.filter((b) => comparison.relatedBuilds.includes(b.slug));

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          generateArticleSchema({
            headline: comparison.title,
            description: comparison.metaDescription,
            path: `/comparisons/${comparison.slug}`,
            datePublished: comparison.lastUpdated,
            dateModified: comparison.lastUpdated,
          })
        )}
      />
      <Breadcrumbs
        items={[
          { name: "Comparisons", path: "/comparisons" },
          { name: comparison.title, path: `/comparisons/${comparison.slug}` },
        ]}
      />
      <h1 className="font-display text-3xl sm:text-4xl text-paper mt-6 mb-4">{comparison.title}</h1>
      <p className="text-dim text-lg leading-relaxed mb-4">{comparison.intro}</p>
      <LastUpdated date={comparison.lastUpdated} />

      <section className="my-12">
        <ComparisonLayout comparison={comparison} />
      </section>

      <section className="mb-14 border-l-2 border-copper pl-5">
        <h2 className="font-display text-xl text-paper mb-2">Verdict</h2>
        <p className="text-dim leading-relaxed">{comparison.verdict}</p>
      </section>

      <div className="mb-14">
        <FAQ items={comparison.faqs} />
      </div>

      <div className="grid gap-8">
        {relatedBuilds.length > 0 && (
          <RelatedContent
            title="Related builds"
            links={relatedBuilds.map((b) => ({ label: `${formatINR(b.budget)} gaming PC build`, href: `/gaming-pc/builds/${b.slug}` }))}
          />
        )}
        <RelatedContent title="Related guides" links={comparison.relatedGuides} />
      </div>
    </div>
  );
}
