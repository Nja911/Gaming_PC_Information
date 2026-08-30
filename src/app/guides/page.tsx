import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { guides } from "@/content/guides";
import GuideCard from "@/components/guides/GuideCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Gaming Guides — Resolutions, Upgrades & PC Building",
  description:
    "Practical gaming guides covering resolutions, RAM, upgrades and PC building fundamentals, organised by topic.",
  path: "/guides",
});

export default function GuidesHubPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ name: "Guides", path: "/guides" }]} />
      <h1 className="font-display text-4xl text-paper mt-6 mb-4">Gaming Guides</h1>
      <p className="text-dim max-w-2xl leading-relaxed mb-10">
        Guides grouped by topic cluster so related questions link naturally to each other — start wherever your
        question is.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
    </div>
  );
}
