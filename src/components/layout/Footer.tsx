import Link from "next/link";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";
import { builds } from "@/content/builds";

const COLUMNS = [
  { title: "Builds", links: [{ label: "All builds", href: "/gaming-pc/builds" }, ...builds.map((b) => ({ label: b.budget.toLocaleString("en-IN"), href: `/gaming-pc/builds/${b.slug}` }))] },
  { title: "Research", links: [{ label: "Components", href: "/components" }, { label: "Guides", href: "/guides" }, { label: "Comparisons", href: "/comparisons" }] },
  { title: "About", links: [{ label: "About us", href: "/about" }, { label: "Editorial policy", href: "/editorial-policy" }, { label: "Methodology", href: "/methodology" }] },
  { title: "Legal", links: [{ label: "Privacy policy", href: "/privacy-policy" }, { label: "Terms", href: "/terms" }] },
];

export default function Footer() {
  return <footer className="mt-28 border-t border-line">
    <div className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8">
      <div className="mb-16 max-w-2xl"><p className="mb-5 text-xs font-medium uppercase tracking-[.18em] text-accent">{SITE_NAME}</p><p className="font-display text-4xl leading-[.95] sm:text-6xl">Spend the budget where it changes the game.</p></div>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {COLUMNS.map((col) => <div key={col.title}><h3 className="mb-4 text-xs font-medium uppercase tracking-[.14em] text-dim">{col.title}</h3><ul className="space-y-2">{col.links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm transition-colors hover:text-accent">{link.label}</Link></li>)}</ul></div>)}
      </div>
      <div className="editorial-rule my-10" /><div className="flex flex-col justify-between gap-3 text-sm text-dim sm:flex-row"><p className="max-w-md">{SITE_NAME} — {SITE_DESCRIPTION}</p><p>Independent editorial content · Affiliate disclosure · © {new Date().getFullYear()} {SITE_NAME}</p></div>
    </div>
  </footer>;
}
