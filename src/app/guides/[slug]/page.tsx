import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata, generateArticleSchema, jsonLd, formatINR } from "@/lib/seo";
import { getGuideBySlug, getAllGuideSlugs } from "@/content/guides";
import { builds } from "@/content/builds";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import FAQ from "@/components/ui/FAQ";
import { RelatedContent, LastUpdated, AuthorInfo } from "@/components/ui/Meta";

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.title,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const relatedBuilds = builds.filter((b) => guide.relatedBuilds.includes(b.slug));

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          generateArticleSchema({
            headline: guide.title,
            description: guide.metaDescription,
            path: `/guides/${guide.slug}`,
            datePublished: guide.lastUpdated,
            dateModified: guide.lastUpdated,
          })
        )}
      />
      <Breadcrumbs
        items={[
          { name: "Guides", path: "/guides" },
          { name: guide.title, path: `/guides/${guide.slug}` },
        ]}
      />
      <p className="font-mono text-xs uppercase tracking-wide text-signal mt-6 mb-2">{guide.cluster}</p>
      <h1 className="font-display text-3xl sm:text-4xl text-paper mb-4">{guide.title}</h1>
      <p className="text-dim text-lg leading-relaxed mb-4">{guide.intro}</p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10">
        <LastUpdated date={guide.lastUpdated} />
        <AuthorInfo />
      </div>

      <div className="space-y-10 mb-14">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-2xl text-paper mb-3">{section.heading}</h2>
            <p className="text-dim leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>

      <div className="mb-14">
        <FAQ items={guide.faqs} />
      </div>

      <div className="grid gap-8">
        {relatedBuilds.length > 0 && (
          <RelatedContent
            title="Related builds"
            links={relatedBuilds.map((b) => ({ label: `${formatINR(b.budget)} gaming PC build`, href: `/gaming-pc/builds/${b.slug}` }))}
          />
        )}
        <RelatedContent title="Related components" links={guide.relatedComponents} />
        <RelatedContent title="Related guides" links={guide.relatedGuides} />
      </div>
    </div>
  );
}
