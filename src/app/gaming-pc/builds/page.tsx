import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { builds } from "@/content/builds";
import BuildCard from "@/components/builds/BuildCard";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Gaming PC Builds by Budget — India",
  description:
    "Browse current Indian gaming PC builds from ₹50,000 used-AM4 value rigs to ₹1,50,000 new-AM5 1440p and 4K builds, each with full component reasoning.",
  path: "/gaming-pc/builds",
});

export default function BuildsHubPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ name: "Gaming PC Builds", path: "/gaming-pc/builds" }]} />
      <h1 className="font-display text-4xl text-paper mt-6 mb-4">Gaming PC Builds by Budget</h1>
      <p className="text-dim max-w-2xl leading-relaxed mb-10">
        Every build here is chosen as a balanced whole, not a list of the &ldquo;best&rdquo; part in each category glued
        together. Pick the budget closest to yours, then read the reasoning — the trade-offs matter as much as the
        parts list.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {builds.map((build) => (
          <BuildCard key={build.slug} build={build} />
        ))}
      </div>
    </div>
  );
}
