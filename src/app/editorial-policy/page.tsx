import type { Metadata } from "next";
import { pageMetadata, SITE_NAME } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Editorial Policy",
  description: `How ${SITE_NAME} chooses, writes and updates its gaming PC recommendations.`,
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ name: "Editorial Policy", path: "/editorial-policy" }]} />
      <h1 className="font-display text-4xl text-paper mt-6 mb-6">Editorial Policy</h1>
      <div className="space-y-5 text-dim leading-relaxed">
        <p>
          Recommendations on {SITE_NAME} are chosen for balance within a stated budget, not for any commercial
          relationship with a manufacturer or retailer. Where affiliate links are used in the future, they will be
          clearly identified and will never change which component is recommended.
        </p>
        <p>We do not publish fabricated ratings, reviews or statistics, and we avoid presenting estimates as precise measurements.</p>
        <p>Pages are periodically reviewed and updated as component pricing and availability shift — each page shows the date it was last updated.</p>
      </div>
    </div>
  );
}
