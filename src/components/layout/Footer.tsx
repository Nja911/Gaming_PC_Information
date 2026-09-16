import Link from "next/link";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";
import { builds } from "@/content/builds";
import { componentCategories } from "@/content/components";

const COLUMNS = [
  { title: "01 / Builds", links: [{ label: "All builds", href: "/gaming-pc/builds" }, ...builds.map((b) => ({ label: `₹${b.budget.toLocaleString("en-IN")}`, href: `/gaming-pc/builds/${b.slug}` }))] },
  { title: "02 / Hardware", links: componentCategories.map((category) => ({ label: category.shortName, href: `/components/${category.slug}` })) },
  { title: "03 / Gaming", links: [{ label: "1080p", href: "/guides/1080p-gaming" }, { label: "1440p", href: "/guides/1440p-gaming" }, { label: "4K", href: "/guides/4k-gaming" }, { label: "Guides index", href: "/guides" }, { label: "Comparisons", href: "/comparisons" }] },
];

export default function Footer() {
  return <footer className="mt-28 border-t border-line">
    <div className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8 sm:py-24">
      <p className="footer-wordmark font-display">{SITE_NAME}</p>
      <div className="mt-10 grid gap-12 border-t border-line pt-8 md:grid-cols-[1fr_2fr]">
        <p className="max-w-sm text-sm leading-relaxed text-dim">{SITE_DESCRIPTION} Prices are estimates; verify current stock, condition and warranty before buying.</p>
        <div className="grid gap-10 sm:grid-cols-3">
          {COLUMNS.map((col) => <div key={col.title}><h3 className="mb-4 text-xs font-medium uppercase tracking-[.14em] text-dim">{col.title}</h3><ul className="space-y-2">{col.links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm transition-colors hover:text-accent">{link.label}</Link></li>)}</ul></div>)}
        </div>
      </div>
      <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-5 text-xs text-dim sm:flex-row"><p>Independent editorial content · Affiliate disclosure · © {new Date().getFullYear()} {SITE_NAME}</p><p><Link href="/about" className="hover:text-accent">About</Link> · <Link href="/privacy-policy" className="hover:text-accent">Privacy</Link> · <Link href="/terms" className="hover:text-accent">Terms</Link></p></div>
    </div>
  </footer>;
}
