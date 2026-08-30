import Link from "next/link";
import type { RelatedLink, Source } from "@/types";

export function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <div className="border border-line rounded-md p-5 bg-panel">
        <h3 className="font-display text-sm uppercase tracking-wide text-signal mb-3">Strengths</h3>
        <ul className="space-y-2 text-dim text-sm">
          {pros.map((p) => (
            <li key={p} className="flex gap-2">
              <span aria-hidden="true" className="text-signal">+</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-line rounded-md p-5 bg-panel">
        <h3 className="font-display text-sm uppercase tracking-wide text-copper mb-3">Weaknesses</h3>
        <ul className="space-y-2 text-dim text-sm">
          {cons.map((c) => (
            <li key={c} className="flex gap-2">
              <span aria-hidden="true" className="text-copper">–</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function RelatedContent({ title = "Related reading", links }: { title?: string; links: RelatedLink[] }) {
  if (!links.length) return null;
  return (
    <nav aria-label={title}>
      <h2 className="font-display text-xl font-medium text-paper mb-4">{title}</h2>
      <ul className="grid sm:grid-cols-2 gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block border border-line rounded-md px-4 py-3 text-paper hover:border-copper transition-colors"
            >
              {link.label} <span aria-hidden="true" className="text-copper">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function LastUpdated({ date, pricesChecked }: { date: string; pricesChecked?: string }) {
  const formatted = new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <p className="text-sm text-dim">
      Last updated <time dateTime={date}>{formatted}</time>{pricesChecked && ` · prices checked ${new Date(pricesChecked).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}`}
    </p>
  );
}

export function AuthorInfo() {
  return (
    <p className="text-sm text-dim">
      Reviewed by the <span className="text-paper">Bench Verdict editorial team</span> — see our{" "}
      <Link href="/methodology" className="text-copper hover:underline">
        methodology
      </Link>{" "}
      for how we build and evaluate recommendations.
    </p>
  );
}

export function Sources({ sources = [] }: { sources?: Source[] }) {
  if (!sources.length) return null;
  return (
    <section className="mt-12 border-t border-line pt-6">
      <h2 className="font-display text-xl text-paper mb-3">Sources checked</h2>
      <ul className="space-y-2 text-sm text-dim">
        {sources.map((source) => (
          <li key={source.id}>
            <a href={source.url} target="_blank" rel="noreferrer" className="underline editorial-link">
              {source.name}
            </a>{" "}({source.type}, checked {source.accessedAt}) — {source.supports}
          </li>
        ))}
      </ul>
    </section>
  );
}
