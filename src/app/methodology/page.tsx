import type { Metadata } from "next";
import { pageMetadata, SITE_NAME } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Methodology",
  description: `How ${SITE_NAME} evaluates components and builds gaming PC recommendations.`,
  path: "/methodology",
});

export default function MethodologyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Breadcrumbs items={[{ name: "Methodology", path: "/methodology" }]} />
      <h1 className="font-display text-4xl text-paper mt-6 mb-6">Methodology</h1>
      <div className="space-y-5 text-dim leading-relaxed">
        <p>Each build is assembled as a balanced whole: component choices are weighed against each other, not picked in isolation.</p>
        <ul className="space-y-2 list-disc list-inside">
          <li>Performance ratings reflect typical experience across popular titles at reasonable settings, not benchmarks for every game.</li>
          <li>Prices shown are current Indian-market estimates, expressed as ranges where retailer, region, availability or condition can materially change the result.</li>
          <li>₹50,000–₹1,00,000 builds use used AM4 CPU, GPU, motherboard and RAM to maximise gaming value. PSU, SSD, case and cooler prices default to new parts unless noted otherwise.</li>
          <li>For used parts, ask for testing, the original bill and remaining warranty where possible; marketplace estimates are not retailer-backed guarantees.</li>
          <li>We avoid presenting false precision — where reliable frame-rate data isn&apos;t available for a specific configuration, we say so.</li>
          <li>Builds and guides are revisited as pricing, availability and new hardware generations shift the balance between components.</li>
        </ul>
      </div>
    </div>
  );
}
