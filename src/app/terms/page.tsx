import type { Metadata } from "next";
import { pageMetadata, SITE_NAME } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms governing use of the ${SITE_NAME} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ name: "Terms", path: "/terms" }]} />
      <h1 className="font-display text-4xl text-paper mt-6 mb-6">Terms of Use</h1>
      <div className="space-y-5 text-dim leading-relaxed">
        <p>
          Content on {SITE_NAME} is provided for general informational purposes. Component pricing, availability and
          performance can change after publication — always verify current specifications and pricing with the
          retailer before purchasing.
        </p>
        <p>This placeholder should be reviewed and replaced with complete terms appropriate to your jurisdiction before the site goes live.</p>
      </div>
    </div>
  );
}
