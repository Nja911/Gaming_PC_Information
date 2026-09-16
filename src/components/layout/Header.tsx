import Link from "next/link";
import { SITE_NAME } from "@/lib/seo";
import ThemeToggle from "@/components/layout/ThemeToggle";

const NAV = [
  { label: "Builds", href: "/gaming-pc/builds" },
  { label: "Components", href: "/components" },
  { label: "Guides", href: "/guides" },
  { label: "Compare", href: "/comparisons" },
];

export default function Header() {
  return <header className="site-header sticky top-0 z-40 border-b border-line">
    <div className="site-header__inner mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-5 sm:px-8">
      <Link href="/" className="site-wordmark shrink-0 font-display text-[1.35rem] font-semibold sm:text-[1.55rem]">{SITE_NAME}</Link>
      <nav aria-label="Primary" className="desktop-nav hidden items-center gap-8 md:flex">
        {NAV.map((item) => <Link key={item.href} href={item.href} className="min-h-11 content-center text-sm text-dim transition-colors hover:text-paper">{item.label}</Link>)}
      </nav>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <details className="mobile-menu relative md:hidden">
          <summary className="min-h-11 cursor-pointer content-center px-2 text-sm font-medium">Menu</summary>
          <nav aria-label="Mobile" className="mobile-menu__panel absolute right-0 top-[4.25rem] w-[min(18rem,calc(100vw-2.5rem))] bg-ink px-5 py-3 shadow-lg">
            {NAV.map((item) => <Link key={item.href} href={item.href} className="block min-h-11 content-center border-b border-line py-2 text-sm last:border-0">{item.label}</Link>)}
          </nav>
        </details>
      </div>
    </div>
  </header>;
}
