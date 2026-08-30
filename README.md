# Bench Verdict — Gaming PC Builds & Buying Guides

A content-driven, SEO-first informational website for gaming PC builds, components,
guides and comparisons, targeting India (INR) with an architecture designed to
extend to other countries later without a rewrite.

This is **not** a SaaS product or a store: no login, accounts, cart, checkout or
user dashboards. It's a static/server-rendered publication built to scale from a
handful of pages to hundreds.

## Stack

- **Next.js 16** (App Router, Server Components, static generation)
- **TypeScript** (strict)
- **Tailwind CSS v4** (design tokens via `@theme inline` in `globals.css`)
- No database, no auth, no backend services — content lives in typed TypeScript
  data files and pages are statically generated at build time.

## Information architecture

```
/                              Homepage — the primary SEO hub
/gaming-pc/builds              Builds hub
/gaming-pc/builds/[budget]     e.g. /gaming-pc/builds/100000
/components                    Components hub
/components/[category]         e.g. /components/gpu
/guides                        Guides hub
/guides/[slug]                 e.g. /guides/1440p-gaming
/comparisons                   Comparisons hub
/comparisons/[slug]            e.g. /comparisons/amd-vs-intel
/about /editorial-policy /methodology /privacy-policy /terms
/sitemap.xml /robots.txt       Generated from the content registries
```

URLs are short, lowercase, hyphenated and permanent by design — the budget in
the URL (`/gaming-pc/builds/100000`) is the number in rupees with no formatting,
so a future country/currency variant can reuse the same pattern with a
different content set.

## Content model — how to add a page without touching route code

Content lives under `src/content/<type>/`, typed by `src/types/index.ts`.
Each content type has an `index.ts` registry that the routes and the sitemap
read from. **Adding a new page is: write the data file, import it into the
registry array.** No new route files, no sitemap edits.

```
src/content/builds/50000.ts          # one file per budget tier
src/content/builds/index.ts          # registry — add new builds here
src/content/components/gpu.ts        # one file per component category
src/content/components/index.ts      # registry + `plannedComponentCategories`
src/content/guides/1440p-gaming.ts   # one file per guide
src/content/guides/index.ts
src/content/comparisons/amd-vs-intel.ts
src/content/comparisons/index.ts
```

`plannedComponentCategories` in `content/components/index.ts` lists category
slugs (RAM, SSD, PSU, case, cooler, motherboard) that have reserved URLs in the
information architecture but no page yet — they show as "coming soon" on the
hub instead of creating thin indexable pages before there's real content.

## SEO system

`src/lib/seo.ts` is the single source of metadata and structured-data logic:

- `pageMetadata()` — title, description, canonical URL, Open Graph, Twitter
  card. Every route's `generateMetadata`/`export const metadata` goes through
  this function, so there's one place to change the metadata shape.
- `generateBreadcrumbSchema()`, `generateFAQSchema()`, `generateArticleSchema()`,
  `generateWebSiteSchema()` — JSON-LD builders rendered via the `jsonLd()`
  helper. No fake ratings/reviews — `Product` schema is intentionally not used
  anywhere since no page has genuine review/rating data.
- `src/app/sitemap.ts` and `src/app/robots.ts` are generated from the same
  content registries, so a new build/component/guide/comparison is
  automatically included in the sitemap.

Every indexable page has a unique title/description, one H1, semantic
H2/H3 hierarchy, a canonical URL, breadcrumbs (with `BreadcrumbList` schema),
internal links with descriptive anchor text, and an `Article` + `FAQPage`
schema where relevant.

## Rendering & performance

- Every route in the initial page set is statically generated
  (`○ Static` / `● SSG` in the `next build` output) — no client-side
  dependency for indexable text content.
- The current page is server-rendered and has no client-side animation
  dependency. The written explanation of what's in a gaming PC lives in plain
  HTML content.
- No client-side routing dependency for SEO text; no unnecessary third-party
  scripts.

## Design system

Tokens live in `src/app/globals.css` (`:root` custom properties + Tailwind's
`@theme inline`). Direction: a graphite/near-black base with hairline "circuit
trace" dividers and a restrained copper accent, plus a cool mint "signal"
accent reserved for performance/data readouts — deliberately not the generic
neon-RGB "gamer" look, and not a template dark theme either.

**Fonts:** this sandbox has no network access to Google Fonts at build time,
so `globals.css` currently falls back to system font stacks for the display
(`Space Grotesk` → system-ui), body (`Inter` → system-ui) and mono
(`IBM Plex Mono` → ui-monospace) roles. When you deploy with normal internet
access, swap in `next/font/google` for these three faces — the token names
(`--font-display`, `--font-body`, `--font-mono`) and every class that uses
them (`.font-display`, `.font-mono`) are already wired up, so this is a
one-file change in `globals.css` plus a `next/font` import in `layout.tsx`.

## Component library

Reusable, typed components used across every page type — no duplicated JSX
for the same UI pattern:

- `components/ui/` — `Breadcrumbs`, `FAQ`, `SpecTable`, `Meta.tsx`
  (`ProsCons`, `RelatedContent`, `LastUpdated`, `AuthorInfo`)
- `components/builds/` — `BuildCard`, `BudgetCard`, `PerformanceCard`
- `components/components/` — `ComponentCard`
- `components/guides/` — `GuideCard`
- `components/comparisons/` — `ComparisonCard` + `ComparisonLayout`
- `components/layout/` — `Header`, `Footer`

## Prices

Component prices shown in build pages are **illustrative estimates**, clearly
labelled as such in `SpecTable`. There is no live pricing integration. The
data model (`BuildComponent.priceINR`) is a plain optional number, so wiring
up a real price feed later is additive — it doesn't require restructuring the
content model.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build       # production build + static generation
npm run start        # serve the production build
npm run lint          # ESLint (flat config, next/core-web-vitals + next/typescript)
npx tsc --noEmit       # type-check only
```

## Deploying to Vercel

1. Push this repository to GitHub (or import the folder directly in the
   Vercel dashboard).
2. Import the project in Vercel — no environment variables are required for
   the current feature set (no database, no third-party API keys).
3. Update `SITE_URL` in `src/lib/seo.ts` to your real production domain before
   going live — it's used to build every canonical URL, Open Graph URL and the
   sitemap.
4. Vercel will run `next build` automatically; the output is a static/ISR-ready
   deployment with no server infrastructure to manage.

Before launch, also replace the placeholder legal copy in `/privacy-policy`
and `/terms` with real terms appropriate to your jurisdiction and whatever
analytics/affiliate tooling you actually deploy.

## Extending the site

- **New budget tier:** add `src/content/builds/<budget>.ts`, import it in
  `src/content/builds/index.ts`. It automatically gets a route, a sitemap
  entry, and shows up in every "related builds" list that matches its slug.
- **New component category:** same pattern in `src/content/components/`; move
  its slug out of `plannedComponentCategories` once written.
- **New guide/comparison:** same pattern in their respective folders.
- **New country/currency:** `formatINR()` in `lib/seo.ts` is the only
  currency-formatting call site; the `GamingPCBuild.budget` field is a plain
  number rather than a pre-formatted string, so both are swappable behind a
  locale/currency parameter without touching page components.
