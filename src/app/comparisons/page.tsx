import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { comparisons } from "@/content/comparisons";
import { ComparisonCard } from "@/components/comparisons/ComparisonCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Component Comparisons — CPU, GPU & Platform",
  description: "Head-to-head comparisons focused on the actual purchase decision, not just a specification dump.",
  path: "/comparisons",
});

export default function ComparisonsHubPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ name: "Comparisons", path: "/comparisons" }]} />
      <h1 className="font-display text-4xl text-paper mt-6 mb-4">Comparisons</h1>
      <p className="text-dim max-w-2xl leading-relaxed mb-10">
        Every comparison here is built around the decision you&apos;re actually making, not a raw specification dump.
      </p>
      <div className="grid sm:grid-cols-2 gap-5">
        {comparisons.map((c) => (
          <ComparisonCard key={c.slug} comparison={c} />
        ))}
      </div>
    </div>
  );
}
