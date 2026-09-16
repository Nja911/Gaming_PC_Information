import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata, formatINR } from "@/lib/seo";
import { builds } from "@/content/builds";
import { componentCategories } from "@/content/components";
import { guides } from "@/content/guides";
import { comparisons } from "@/content/comparisons";
import FAQ from "@/components/ui/FAQ";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Gaming PC Builds for Every Budget in India",
    description: "Researched gaming PC builds, component guides and comparisons for every budget in India.",
    path: "/",
  }),
  other: { "google-site-verification": "MDV5l2rCEiSup1dTobEocmL0CcIMZjFhs3zMkXs8WYE" },
};

const faqs = [
  { question: "What is the best gaming PC budget in India?", answer: "There is no single right answer. ₹40,000–₹1,00,000 covers value-focused AM4 builds, while ₹1,25,000–₹2,50,000 moves into new AM5 systems for high-refresh 1440p and 4K. Pick based on your target resolution, games and tolerance for used parts." },
  { question: "Should I build my own PC or buy pre-built?", answer: "Building your own generally gets you better component quality for the same money and makes future upgrades easier. Pre-built can make sense when a whole-system warranty matters more than flexibility." },
  { question: "How often should I upgrade a gaming PC?", answer: "A well-chosen GPU tends to stay relevant for two to four years. The rest of the platform often lasts through more than one GPU upgrade when chosen with headroom." },
  { question: "Are the prices exact?", answer: "No. Build prices are approximate estimates and can change with retailer, region, stock and promotions. Check the linked product source before buying." },
];

const resolutions = [
  { label: "1080p", href: "/guides/1080p-gaming", note: "Value and high refresh" },
  { label: "1440p", href: "/guides/1440p-gaming", note: "The balanced target" },
  { label: "4K", href: "/guides/4k-gaming", note: "GPU-first performance" },
];

function gpuFor(build: (typeof builds)[number]) {
  return build.components.find((component) => component.category === "GPU")?.name ?? "GPU details on build page";
}

function cpuFor(build: (typeof builds)[number]) {
  return build.components.find((component) => component.category === "CPU")?.name ?? "CPU details on build page";
}

export default function HomePage() {
  const leadBuild = builds[4] ?? builds[0];
  const secondBuild = builds[1] ?? builds[0];

  return <>
    <section className="mx-auto grid max-w-[90rem] items-end gap-10 px-5 pb-12 pt-16 sm:px-8 sm:pb-20 sm:pt-24 lg:grid-cols-[.9fr_1.1fr]">
      <div className="pb-2 lg:pb-10">
        <p className="section-kicker mb-7">Independent research · India</p>
        <h1 className="hero-mark font-display font-semibold">gamingpc-guide</h1>
        <p className="mt-10 max-w-md text-lg leading-relaxed text-dim">Real builds, component advice and buying guides for Indian gamers who want to know where the money goes.</p>
        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium">
          <Link href="/gaming-pc/builds" className="min-h-11 content-center underline editorial-link">Start with builds <span aria-hidden="true">↗</span></Link>
          <Link href="#budgets" className="min-h-11 content-center text-dim underline decoration-line underline-offset-4">See the budget index</Link>
        </div>
      </div>
      <div className="hero-image relative overflow-hidden bg-panel">
        <Image src="/images/gaming-pc-hero.png" alt="A charcoal gaming PC tower with a glass side panel" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" />
        <p className="absolute bottom-4 left-4 text-xs text-white/75">Hardware first. Advice second.</p>
      </div>
    </section>

    <section id="budgets" className="border-y border-line">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[.72fr_1.28fr]">
        <div>
          <p className="section-kicker mb-5">01 / Start here</p>
          <h2 className="font-display text-5xl leading-[.88] sm:text-7xl">What are you<br />spending?</h2>
          <p className="mt-7 max-w-xs text-sm leading-relaxed text-dim">Choose the budget first. Each row leads to a complete parts list with the trade-offs made visible.</p>
        </div>
        <div className="divide-y divide-line border-t border-line">
          {builds.map((build, index) => <Link key={build.slug} href={`/gaming-pc/builds/${build.slug}`} className="index-row group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 px-2 transition-colors sm:grid-cols-[3.5rem_minmax(0,1fr)_10rem_auto] sm:gap-5">
            <span className="index-number font-mono text-xs text-dim">{String(index + 1).padStart(2, "0")}</span>
            <span className="font-display min-w-0 text-3xl transition-colors group-hover:text-accent sm:text-5xl">{formatINR(build.budget)}</span>
            <span className="hidden text-xs uppercase tracking-[.14em] text-dim sm:block">{build.targetResolutions?.join(" / ") ?? build.targetResolution}</span>
            <span className="text-lg text-accent" aria-hidden="true">↗</span>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 sm:py-36">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
        <div><p className="section-kicker mb-5">02 / Featured build</p><h2 className="font-display max-w-xl text-5xl leading-[.88] sm:text-7xl">Spend on the<br />frame rate.</h2></div>
        <Link href="/gaming-pc/builds" className="min-h-11 content-center text-sm underline editorial-link">All builds ↗</Link>
      </div>
      <Link href={`/gaming-pc/builds/${leadBuild.slug}`} className="group grid gap-8 border-t border-line pt-6 lg:grid-cols-[1.35fr_.65fr] lg:gap-12">
        <div className="product-frame relative aspect-[4/3] overflow-hidden">
          <Image src="/images/graphics-card-feature.png" alt="Close-up of a charcoal triple-fan graphics card" fill className="feature-image object-cover" sizes="(max-width: 1024px) 100vw, 65vw" />
        </div>
        <div className="flex flex-col justify-between gap-10">
          <div><p className="section-kicker mb-4">{leadBuild.targetResolutions?.join(" / ")}</p><h3 className="font-display text-4xl leading-[.92] sm:text-6xl">{leadBuild.title.replace("Best Gaming PC Under ", "")}</h3><p className="mt-6 max-w-md text-sm leading-relaxed text-dim">{leadBuild.intro}</p></div>
          <div className="grid grid-cols-2 gap-5"><div className="product-stat"><span className="block text-xs uppercase tracking-[.12em] text-dim">GPU</span><span className="mt-2 block text-sm leading-snug">{gpuFor(leadBuild)}</span></div><div className="product-stat"><span className="block text-xs uppercase tracking-[.12em] text-dim">CPU</span><span className="mt-2 block text-sm leading-snug">{cpuFor(leadBuild)}</span></div><div className="product-stat col-span-2"><span className="block text-xs uppercase tracking-[.12em] text-dim">Build estimate</span><span className="readout mt-2 block text-3xl text-accent">{formatINR(leadBuild.budget)}</span></div></div>
        </div>
      </Link>
      <div className="mt-16 grid gap-8 border-t border-line pt-6 md:grid-cols-2">
        {[secondBuild, builds[6] ?? builds[2]].map((build) => <Link key={build.slug} href={`/gaming-pc/builds/${build.slug}`} className="group grid gap-5 sm:grid-cols-[10rem_1fr]">
          <div className="product-frame relative aspect-square overflow-hidden"><Image src="/images/gaming-pc-hero.png" alt="Gaming PC build visual" fill className="feature-image object-cover" sizes="(max-width: 640px) 100vw, 10rem" /></div>
          <div><p className="section-kicker mb-3">{build.targetResolution} · {formatINR(build.budget)}</p><h3 className="font-display text-3xl leading-[.92] transition-colors group-hover:text-accent">{build.title.replace("Best Gaming PC Under ", "")}</h3><p className="mt-4 text-sm leading-relaxed text-dim">{gpuFor(build)}</p></div>
        </Link>)}
      </div>
    </section>

    <section className="bg-paper text-ink">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[.8fr_1.2fr]">
        <div><p className="section-kicker mb-5">03 / Resolution</p><h2 className="font-display text-6xl leading-[.8] sm:text-8xl">1080p.<br />1440p.<br />4K.</h2></div>
        <div><p className="inverse-muted max-w-lg text-xl leading-relaxed">The screen decides the shape of the build. Start with the experience, then follow the budget and parts that support it.</p><div className="mt-12 divide-y divide-line border-y border-line">{resolutions.map((resolution, index) => <Link key={resolution.href} href={resolution.href} className="resolution-link group grid grid-cols-[3rem_1fr_auto] items-end gap-4 py-6"><span className="font-mono inverse-muted text-xs">0{index + 1}</span><span className="resolution-number font-display text-4xl transition-colors sm:text-6xl">{resolution.label}</span><span className="inverse-muted pb-1 text-right text-xs sm:text-sm">{resolution.note}<br /><span className="text-ink">Read the guide ↗</span></span></Link>)}</div></div>
      </div>
    </section>

    <section className="border-b border-line">
      <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mb-12 max-w-xl"><p className="section-kicker mb-5">04 / The parts</p><h2 className="font-display text-5xl leading-[.88] sm:text-7xl">Every choice<br />has a cost.</h2></div>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div className="product-frame relative aspect-[4/3] overflow-hidden"><Image src="/images/graphics-card-feature.png" alt="Close-up of a charcoal triple-fan graphics card" fill className="feature-image object-cover" sizes="(max-width: 1024px) 100vw, 60vw" /></div>
          <div className="divide-y divide-line border-t border-line">{componentCategories.map((category) => <Link key={category.slug} href={`/components/${category.slug}`} className="group flex min-h-20 items-center justify-between gap-4 border-b border-line"><div><span className="section-kicker block">{category.shortName}</span><h3 className="font-display mt-2 text-3xl transition-colors group-hover:text-accent sm:text-4xl">{category.name}</h3></div><span className="text-xl text-accent" aria-hidden="true">↗</span></Link>)}<Link href="/components" className="block min-h-11 content-center pt-5 text-sm underline editorial-link">Component index ↗</Link></div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
        <div><p className="section-kicker mb-5">05 / Read before you buy</p><h2 className="font-display text-5xl leading-[.88] sm:text-7xl">Useful answers,<br />no theatre.</h2><p className="mt-7 max-w-sm text-sm leading-relaxed text-dim">Guides built around the decisions that actually change a gaming PC.</p></div>
        <div className="divide-y divide-line border-t border-line">{guides.slice(0, 6).map((guide, index) => <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group grid grid-cols-[2.5rem_5.5rem_1fr_auto] items-start gap-3 border-b border-line py-6 sm:grid-cols-[3rem_8rem_1fr_auto] sm:gap-5"><span className="font-mono text-xs text-dim">0{index + 1}</span><span className="text-xs uppercase tracking-[.12em] text-dim">{guide.cluster}</span><span className="font-display text-2xl leading-[.95] transition-colors group-hover:text-accent sm:text-3xl">{guide.title}</span><span className="text-accent" aria-hidden="true">↗</span></Link>)}</div>
      </div>
      <div className="mt-28 grid gap-14 lg:grid-cols-[.75fr_1.25fr]"><div><p className="section-kicker mb-5">06 / Compare</p><h2 className="font-display text-5xl leading-[.88] sm:text-7xl">The choice<br />between.</h2></div><div className="divide-y divide-line border-t border-line">{comparisons.map((comparison, index) => <Link key={comparison.slug} href={`/comparisons/${comparison.slug}`} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-line py-6 sm:grid-cols-[3rem_1fr_auto] sm:gap-5"><span className="font-mono text-xs text-dim">0{index + 1}</span><span className="font-display text-2xl leading-[.95] transition-colors group-hover:text-accent sm:text-3xl">{comparison.left.name} <em className="text-accent">vs</em> {comparison.right.name}</span><span className="text-accent" aria-hidden="true">↗</span></Link>)}</div></div>
    </section>

    <section className="mx-auto max-w-[90rem] px-5 pb-20 sm:px-8"><FAQ items={faqs} title="Common questions" /><div className="mt-20 border-t border-line pt-10"><p className="max-w-xl text-sm leading-relaxed text-dim">Recommendations are independently researched and prices are approximate estimates. Read our <Link href="/methodology" className="underline editorial-link">methodology</Link> and <Link href="/editorial-policy" className="underline editorial-link">editorial policy</Link> for sourcing and update practices.</p><Link href="#budgets" className="mt-8 inline-block min-h-11 content-center font-display text-3xl underline editorial-link">Choose a build ↗</Link></div></section>
  </>;
}
