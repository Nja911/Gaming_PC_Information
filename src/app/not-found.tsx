import Link from "next/link";
import { builds } from "@/content/builds";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-wide text-copper mb-4">404</p>
      <h1 className="font-display text-3xl sm:text-4xl text-paper mb-4">This page isn&apos;t here</h1>
      <p className="text-dim leading-relaxed mb-10">
        The page you were looking for may have moved or the link may be out of date. Try one of these instead:
      </p>
      <div className="grid sm:grid-cols-2 gap-3 text-left">
        <Link href="/gaming-pc/builds" className="border border-line rounded-md px-4 py-3 text-paper hover:border-copper transition-colors">
          Gaming PC builds by budget
        </Link>
        <Link href="/components" className="border border-line rounded-md px-4 py-3 text-paper hover:border-copper transition-colors">
          Component buying guides
        </Link>
        <Link href="/guides" className="border border-line rounded-md px-4 py-3 text-paper hover:border-copper transition-colors">
          Gaming guides
        </Link>
        <Link href={`/gaming-pc/builds/${builds[0]?.slug ?? ""}`} className="border border-line rounded-md px-4 py-3 text-paper hover:border-copper transition-colors">
          Most popular build
        </Link>
      </div>
    </div>
  );
}
