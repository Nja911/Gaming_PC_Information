import type { Metadata } from "next";
import { pageMetadata, SITE_NAME } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `What ${SITE_NAME} is, who it's for, and how the recommendations are put together.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
      <h1 className="font-display text-4xl text-paper mt-6 mb-6">About {SITE_NAME}</h1>
      <div className="space-y-5 text-dim leading-relaxed">
        <p>
          {SITE_NAME} is an independent resource for people researching gaming PCs and components in India. The goal
          is simple: help you decide what to buy by explaining the reasoning behind each recommendation, not just
          listing parts.
        </p>
        <p>
          We focus on balanced, whole-system builds across common budget tiers, plain-language component guides, and
          comparisons that address the actual purchase decision rather than a raw specification dump.
        </p>
        <p>
          See our <a href="/editorial-policy" className="text-copper hover:underline">editorial policy</a> and{" "}
          <a href="/methodology" className="text-copper hover:underline">methodology</a> for more on how
          recommendations are chosen and kept up to date.
        </p>
      </div>
    </div>
  );
}
