import type { Metadata } from "next";
import { pageMetadata, SITE_NAME } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${SITE_NAME} handles data from visitors to the site.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ name: "Privacy Policy", path: "/privacy-policy" }]} />
      <h1 className="font-display text-4xl text-paper mt-6 mb-6">Privacy Policy</h1>
      <div className="space-y-5 text-dim leading-relaxed">
        <p>
          {SITE_NAME} does not require an account to browse the site — there are no logins, saved builds or user
          profiles. This placeholder policy should be replaced with the specifics of any analytics or advertising
          tools actually deployed before the site goes live, including what data is collected, how long it is kept,
          and how visitors can opt out.
        </p>
        <p>If and when affiliate links are added, this page will disclose that outbound links may be affiliate links.</p>
      </div>
    </div>
  );
}
