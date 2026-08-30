import Link from "next/link";
import { SITE_NAME } from "@/lib/seo";

const NAV = [
  { label: "Builds", href: "/gaming-pc/builds" },
  { label: "Components", href: "/components" },
  { label: "Guides", href: "/guides" },
  { label: "Compare", href: "/comparisons" },
];

export default function Header() {
  return <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur">
    <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between gap-8 px-5 sm:px-8">
      <Link href="/" className="flex shrink-0 items-center gap-3 font-display text-xl font-semibold">
        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-accent" />{SITE_NAME}
      </Link>
      <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
        {NAV.map((item) => <Link key={item.href} href={item.href} className="text-sm text-dim transition-colors hover:text-paper">{item.label}</Link>)}
      </nav>
      <Link href="/guides" className="text-sm font-medium underline editorial-link md:hidden">Explore</Link>
    </div>
  </header>;
}
