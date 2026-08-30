import Link from "next/link";
import { generateBreadcrumbSchema, jsonLd } from "@/lib/seo";

export interface Crumb {
  name: string;
  path: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const full: Crumb[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(generateBreadcrumbSchema(full))}
      />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-dim">
        {full.map((crumb, i) => {
          const isLast = i === full.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" className="text-line">/</span>}
              {isLast ? (
                <span className="text-paper" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="transition-colors hover:text-accent">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
