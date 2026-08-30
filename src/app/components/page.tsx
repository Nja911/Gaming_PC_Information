import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { componentCategories, plannedComponentCategories } from "@/content/components";
import ComponentCard, { PlannedComponentCard } from "@/components/components/ComponentCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Gaming PC Components — Buying Guides",
  description:
    "How to choose every part of a gaming PC — CPU, GPU, RAM, storage, PSU, case and cooling — explained by category.",
  path: "/components",
});

export default function ComponentsHubPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ name: "Components", path: "/components" }]} />
      <h1 className="font-display text-4xl text-paper mt-6 mb-4">Gaming PC Components</h1>
      <p className="text-dim max-w-2xl leading-relaxed mb-10">
        Each category page explains what actually matters when choosing that part, by budget tier and use case —
        not just a list of products.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {componentCategories.map((category) => (
          <ComponentCard key={category.slug} category={category} />
        ))}
        {plannedComponentCategories.map((category) => (
          <PlannedComponentCard key={category.slug} name={category.name} />
        ))}
      </div>
    </div>
  );
}
