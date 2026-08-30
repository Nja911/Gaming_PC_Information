import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata, generateArticleSchema, jsonLd } from "@/lib/seo";
import { getComponentBySlug, getAllComponentSlugs } from "@/content/components";
import { builds } from "@/content/builds";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import FAQ from "@/components/ui/FAQ";
import { RelatedContent, LastUpdated } from "@/components/ui/Meta";
import { formatINR } from "@/lib/seo";

export function generateStaticParams() {
  return getAllComponentSlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getComponentBySlug(slug);
  if (!category) return {};
  return pageMetadata({
    title: category.title,
    description: category.metaDescription,
    path: `/components/${category.slug}`,
  });
}

export default async function ComponentCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getComponentBySlug(slug);
  if (!category) notFound();

  const relatedBuilds = builds.filter((b) => category.relatedBuilds.includes(b.slug));

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          generateArticleSchema({
            headline: category.title,
            description: category.metaDescription,
            path: `/components/${category.slug}`,
            datePublished: category.lastUpdated,
            dateModified: category.lastUpdated,
          })
        )}
      />
      <Breadcrumbs
        items={[
          { name: "Components", path: "/components" },
          { name: category.shortName, path: `/components/${category.slug}` },
        ]}
      />
      <h1 className="font-display text-3xl sm:text-4xl text-paper mt-6 mb-4">{category.title}</h1>
      <p className="text-dim text-lg leading-relaxed mb-4">{category.intro}</p>
      <LastUpdated date={category.lastUpdated} />

      <section className="my-12">
        <h2 className="font-display text-2xl text-paper mb-6">What matters when choosing a {category.shortName}</h2>
        <ul className="space-y-3">
          {category.whatMatters.map((point) => (
            <li key={point} className="flex gap-3 text-dim leading-relaxed">
              <span aria-hidden="true" className="text-copper mt-1">▸</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="font-display text-2xl text-paper mb-6">Budget tiers</h2>
        <div className="border border-line rounded-md divide-y divide-line-soft">
          {category.budgetTiers.map((tier) => (
            <div key={tier.tier} className="p-5">
              <p className="text-paper font-medium mb-1">{tier.tier}</p>
              <p className="text-dim text-sm">{tier.guidance}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid sm:grid-cols-2 gap-8 mb-12">
        <section>
          <h2 className="font-display text-xl text-paper mb-3">Compatibility considerations</h2>
          <ul className="space-y-2 text-dim text-sm">
            {category.compatibilityNotes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-xl text-paper mb-3">Common mistakes</h2>
          <ul className="space-y-2 text-dim text-sm">
            {category.commonMistakes.map((mistake) => (
              <li key={mistake}>• {mistake}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mb-12">
        <FAQ items={category.faqs} />
      </div>

      <div className="grid gap-8">
        {relatedBuilds.length > 0 && (
          <RelatedContent
            title="Related builds"
            links={relatedBuilds.map((b) => ({ label: `${formatINR(b.budget)} gaming PC build`, href: `/gaming-pc/builds/${b.slug}` }))}
          />
        )}
        <RelatedContent title="Related guides" links={category.relatedGuides} />
      </div>
    </div>
  );
}
