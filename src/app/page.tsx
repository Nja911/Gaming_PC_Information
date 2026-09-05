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
    title: "Best Gaming PC Builds for Every Budget in India",
    description:
      "Researched gaming PC builds, component guides and comparisons for every budget in India.",
    path: "/",
  }),
  other: {
    "google-site-verification": "MDV5l2rCEiSup1dTobEocmL0CcIMZjFhs3zMkXs8WYE",
  },
};

const faqs = [
  {
    question: "What is the best gaming PC budget in India?",
    answer:
      "There isn't one right answer — ₹40,000–₹1,00,000 covers value-focused AM4 builds, while ₹1,25,000–₹2,50,000 moves into new AM5 systems for high-refresh 1440p and 4K. Pick based on your target resolution, games and tolerance for used parts.",
  },
  {
    question: "Should I build my own PC or buy pre-built?",
    answer:
      "Building your own generally gets you better component quality for the same money and makes future upgrades easier. Pre-built can make sense when a whole-system warranty matters more than flexibility.",
  },
  {
    question: "How often should I upgrade a gaming PC?",
    answer:
      "A well-chosen GPU tends to stay relevant for two to four years. The rest of the platform often lasts through more than one GPU upgrade when chosen with headroom.",
  },
  {
    question: "Are the prices exact?",
    answer:
      "No. Build prices are approximate estimates and can change with retailer, region, stock and promotions. Check the linked product source before buying.",
  },
  {
    question: "How are these builds selected?",
    answer:
      "We prioritise the parts that change gaming performance most, then balance compatibility, power, upgrade headroom and real-world value. Read the methodology for the full approach.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-360 items-end gap-8 px-5 pb-12 pt-16 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:pb-20 lg:pt-20">
        <div className="relative z-10 pb-4 lg:pb-12 lg:pr-8">
          <p className="mb-8 text-xs font-medium uppercase tracking-[.18em] text-accent">
            Independent research · India
          </p>
          <h1 className="font-display max-w-xl text-[clamp(4.5rem,10vw,9.5rem)] font-semibold leading-[.86]">
            <span className="block whitespace-nowrap">Find your</span>
            <span className="block whitespace-nowrap">gaming PC.</span>
          </h1>
          <p className="mt-10 max-w-md text-lg leading-relaxed text-dim">
            Research-backed builds, component advice and buying guides for
            Indian gamers who want to know where the money goes.
          </p>
          <div className="mt-10 flex gap-6 text-sm font-medium">
            <Link href="/gaming-pc/builds" className="underline editorial-link">
              Explore builds <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href="#budgets"
              className="text-dim underline decoration-line underline-offset-4"
            >
              Start with a budget
            </Link>
          </div>
        </div>
        <div className="relative -mr-5 overflow-hidden sm:-mr-8 lg:-mr-8">
          <Image
            src="/images/gaming-pc-hero.png"
            alt="A charcoal gaming PC tower with a glass side panel"
            width={1536}
            height={1024}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

      <section id="budgets" className="border-y border-line">
        <div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="mb-5 text-xs font-medium uppercase tracking-[.18em] text-accent">
                01 / Start here
              </p>
              <h2 className="font-display text-5xl leading-[.9] sm:text-7xl">
                What are you
                <br />
                spending?
              </h2>
            </div>
            <div className="divide-y divide-line">
              {builds.map((build, i) => (
                <Link
                  key={build.slug}
                  href={`/gaming-pc/builds/${build.slug}`}
                  className="group flex items-baseline justify-between gap-6 py-6"
                >
                  <span className="text-sm text-dim">0{i + 1}</span>
                  <span className="font-display flex-1 text-3xl transition-colors group-hover:text-accent sm:text-5xl">
                    {formatINR(build.budget)}
                    <small className="ml-3 text-base text-dim sm:text-lg">
                      {i === 0
                        ? "Entry"
                        : i === 1
                          ? "Value"
                          : i === 2
                            ? "Sweet spot"
                            : "High-end"}
                    </small>
                  </span>
                  <span
                    className="hover-arrow text-xl text-accent"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 sm:py-36">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[.18em] text-accent">
              02 / Featured builds
            </p>
            <h2 className="font-display text-5xl leading-[.9] sm:text-7xl">
              Built around
              <br />
              the right GPU.
            </h2>
          </div>
          <Link
            href="/gaming-pc/builds"
            className="hidden text-sm underline editorial-link sm:block"
          >
            View all builds ↗
          </Link>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {builds.slice(0, 2).map((build, i) => {
            const gpu = build.components.find((c) => c.category === "GPU");
            return (
              <Link
                key={build.slug}
                href={`/gaming-pc/builds/${build.slug}`}
                className="group border-t border-line pt-5"
              >
                <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-panel">
                  <Image
                    src={
                      i === 0
                        ? "/images/gaming-pc-hero.png"
                        : "/images/graphics-card-feature.png"
                    }
                    alt={
                      i === 0
                        ? "Gaming PC build visual"
                        : "Graphics card detail"
                    }
                    fill
                    className="feature-image object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-sm text-dim">
                      {build.targetResolution} · {gpu?.name}
                    </p>
                    <h3 className="font-display text-3xl sm:text-4xl">
                      {build.title.replace("Best Gaming PC Under ", "")}
                    </h3>
                  </div>
                  <span className="readout text-xl text-accent">
                    {formatINR(build.budget)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div>
              <p className="mb-5 text-xs font-medium uppercase tracking-[.18em] text-accent">
                03 / Resolution
              </p>
              <h2 className="font-display text-5xl leading-[.88] sm:text-8xl">
                1080p.
                <br />
                1440p.
                <br />
                4K.
              </h2>
            </div>
            <div>
              <p className="max-w-lg text-xl leading-relaxed text-dim">
                The right answer depends on the screen you already own. Choose
                the experience first; then we’ll show you where your budget
                should go.
              </p>
              <div className="mt-12 grid grid-cols-3 border-t border-line">
                {["1080p", "1440p", "4K"].map((resolution, i) => (
                  <Link
                    href="/gaming-pc/builds"
                    key={resolution}
                    className="group border-r border-line py-5 last:border-0"
                  >
                    <span className="block text-xs text-dim">0{i + 1}</span>
                    <span className="font-display mt-8 block text-2xl group-hover:text-accent sm:text-4xl">
                      {resolution}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 sm:py-32">
          <div className="mb-12 max-w-xl">
            <p className="mb-5 text-xs font-medium uppercase tracking-[.18em] text-accent">
              04 / The parts
            </p>
            <h2 className="font-display text-5xl leading-[.9] sm:text-7xl">
              Every choice
              <br />
              has a cost.
            </h2>
          </div>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden bg-panel">
              <Image
                src="/images/graphics-card-feature.png"
                alt="Close-up of a charcoal triple-fan graphics card"
                fill
                className="feature-image object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            <div className="divide-y divide-line">
              {componentCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/components/${category.slug}`}
                  className="group flex items-center justify-between gap-4 py-6"
                >
                  <div>
                    <span className="mb-2 block text-xs uppercase tracking-[.15em] text-accent">
                      {category.shortName}
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl">
                      {category.name}
                    </h3>
                  </div>
                  <span
                    className="hover-arrow text-2xl text-accent"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </Link>
              ))}
              <Link
                href="/components"
                className="block pt-6 text-sm underline editorial-link"
              >
                Browse the component index ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[.18em] text-accent">
              05 / Read before you buy
            </p>
            <h2 className="font-display text-5xl leading-[.9] sm:text-7xl">
              Useful answers,
              <br />
              no theatre.
            </h2>
          </div>
          <div className="divide-y divide-line">
            {guides.slice(0, 4).map((guide, i) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex gap-5 py-6"
              >
                <span className="text-sm text-dim">0{i + 1}</span>
                <span className="font-display flex-1 text-2xl transition-colors group-hover:text-accent sm:text-3xl">
                  {guide.title}
                </span>
                <span className="hover-arrow text-accent" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-24 grid gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[.18em] text-accent">
              06 / Compare
            </p>
            <h2 className="font-display text-5xl leading-[.9] sm:text-7xl">
              The choice
              <br />
              between.
            </h2>
          </div>
          <div className="divide-y divide-line">
            {comparisons.map((comparison, i) => (
              <Link
                key={comparison.slug}
                href={`/comparisons/${comparison.slug}`}
                className="group flex gap-5 py-6"
              >
                <span className="text-sm text-dim">0{i + 1}</span>
                <span className="font-display flex-1 text-2xl transition-colors group-hover:text-accent sm:text-3xl">
                  {comparison.left.name} <em className="text-accent">vs</em>{" "}
                  {comparison.right.name}
                </span>
                <span className="hover-arrow text-accent" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-5 pb-20 sm:px-8">
        <FAQ items={faqs} title="Common questions" />
        <div className="mt-20 border-t border-line pt-10">
          <p className="max-w-xl text-sm leading-relaxed text-dim">
            Recommendations are independently researched and prices are
            approximate estimates. Check our{" "}
            <Link href="/methodology" className="underline editorial-link">
              methodology
            </Link>{" "}
            and{" "}
            <Link href="/editorial-policy" className="underline editorial-link">
              editorial policy
            </Link>{" "}
            for sourcing, update practices, and affiliate disclosure.
          </p>
          <Link
            href="#budgets"
            className="mt-8 inline-block font-display text-3xl underline editorial-link"
          >
            Choose a build ↗
          </Link>
        </div>
      </section>
    </>
  );
}
