import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { pageMetadata, generateArticleSchema, jsonLd, formatINR } from "@/lib/seo";
import { builds, getBuildBySlug, getAllBuildSlugs } from "@/content/builds";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SpecTable from "@/components/ui/SpecTable";
import PerformanceCard from "@/components/builds/PerformanceCard";
import FAQ from "@/components/ui/FAQ";
import { RelatedContent, LastUpdated, AuthorInfo } from "@/components/ui/Meta";

export function generateStaticParams() {
  return getAllBuildSlugs().map((budget) => ({ budget }));
}

export async function generateMetadata({ params }: { params: Promise<{ budget: string }> }): Promise<Metadata> {
  const { budget } = await params;
  const build = getBuildBySlug(budget);
  if (!build) return {};
  return pageMetadata({
    title: build.title,
    description: build.metaDescription,
    path: `/gaming-pc/builds/${build.slug}`,
  });
}

export default async function BuildPage({ params }: { params: Promise<{ budget: string }> }) {
  const { budget } = await params;
  const build = getBuildBySlug(budget);
  if (!build) notFound();

  const related = builds.filter((b) => build.relatedBuilds.includes(b.slug));

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          generateArticleSchema({
            headline: build.title,
            description: build.metaDescription,
            path: `/gaming-pc/builds/${build.slug}`,
            datePublished: build.lastUpdated,
            dateModified: build.lastUpdated,
          })
        )}
      />

      <Breadcrumbs
        items={[
          { name: "Gaming PC Builds", path: "/gaming-pc/builds" },
          { name: formatINR(build.budget), path: `/gaming-pc/builds/${build.slug}` },
        ]}
      />

      <h1 className="font-display mt-8 mb-5 max-w-4xl text-5xl leading-[.9] sm:text-7xl">{build.title}</h1>
      <p className="text-dim text-lg leading-relaxed mb-6">{build.intro}</p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10">
        <LastUpdated date={build.lastUpdated} pricesChecked={build.pricesChecked} />
        <AuthorInfo />
      </div>

      {/* Quick summary + illustration */}
      <div className="mb-16 grid items-start gap-8 border-y border-line py-8 sm:grid-cols-[minmax(0,1fr)_18rem] sm:items-center">
        <div className="min-w-0"><p className="mb-3 text-xs uppercase tracking-[.15em] text-accent">Build brief</p><p className="leading-relaxed">{build.summary}</p><p className="readout mt-6 text-3xl text-accent">{formatINR(build.budget)}</p></div>
        <Image src="/images/gaming-pc-hero.png" alt="A gaming PC tower for this build" width={768} height={512} className="aspect-[3/2] h-auto w-full object-cover" />
      </div>

      <section className="mb-14">
        <h2 className="font-display text-2xl text-paper mb-6">Recommended components</h2>
        <SpecTable components={build.components} />
      </section>

      <section className="mb-14">
        <h2 className="font-display text-2xl text-paper mb-4">Why we chose these components</h2>
        <p className="text-dim leading-relaxed">{build.whyTheseComponents}</p>
      </section>

      <section className="mb-14">
        <h2 className="font-display text-2xl text-paper mb-6">Expected gaming performance</h2>
        <PerformanceCard performance={build.performance} />
        <p className="text-sm text-dim mt-4">
          Actual FPS depends on the specific game, its settings, resolution, drivers and updates, and how the CPU and
          GPU are configured together — treat these ratings as guidance rather than a guarantee.
        </p>
      </section>

      <div className="grid sm:grid-cols-2 gap-8 mb-14">
        <section>
          <h2 className="font-display text-xl text-paper mb-3">Upgrade path</h2>
          <p className="text-dim leading-relaxed">{build.upgradePath}</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-paper mb-3">If your budget changes</h2>
          <p className="text-dim leading-relaxed">{build.ifBudgetChanges}</p>
        </section>
      </div>

      <section className="mb-14">
        <h2 className="font-display text-2xl text-paper mb-6">Alternative components</h2>
        <div className="border border-line rounded-md divide-y divide-line-soft">
          {build.alternatives.map((alt) => (
            <div key={alt.component} className="p-5">
              <p className="text-paper font-medium mb-1">
                {alt.component}: <span className="text-copper">{alt.alternative}</span>
              </p>
              <p className="text-dim text-sm">{alt.tradeoff}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mb-14">
        <FAQ items={build.faqs} />
      </div>

      <div className="grid gap-8">
        {related.length > 0 && (
          <RelatedContent
            title="Related builds"
            links={related.map((b) => ({ label: `${formatINR(b.budget)} gaming PC build`, href: `/gaming-pc/builds/${b.slug}` }))}
          />
        )}
        <RelatedContent title="Related guides" links={build.relatedGuides} />
      </div>
    </div>
  );
}
