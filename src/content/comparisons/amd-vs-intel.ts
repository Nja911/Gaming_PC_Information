import type { Comparison } from "@/types";

export const amdVsIntel: Comparison = {
  slug: "amd-vs-intel",
  title: "AMD vs Intel for Gaming: Which CPU Should You Buy?",
  metaDescription:
    "A practical, no-hype comparison of AMD and Intel gaming CPUs — platform cost, upgrade path and where each one actually wins.",
  intro:
    "Neither brand is simply 'better' for gaming across the board. The right pick usually comes down to platform pricing in your specific budget and how much you value a longer CPU-only upgrade path.",
  left: {
    name: "AMD (Ryzen, AM5 platform)",
    architecture: "Chiplet design on the AM5 socket, with a committed multi-year upgrade path.",
    vramOrCache: "Larger cache options available (X3D variants) that particularly help gaming frame rates.",
    performanceCategory: "Strong across budget to high-end, with a notable edge in cache-sensitive games via X3D chips.",
    powerConsumption: "Generally efficient at stock settings; X3D chips run cooler than standard high-end SKUs.",
    targetResolution: "Competitive at every resolution tier — the platform choice matters more than resolution here.",
    strengths: [
      "Committed AM5 platform longevity — CPU-only upgrades for several years.",
      "X3D chips offer a genuine gaming frame-rate advantage in cache-sensitive titles.",
      "Competitive pricing at the budget and mid-range tiers.",
    ],
    weaknesses: [
      "Entry-level AM5 motherboards can be pricier than equivalent Intel boards.",
      "DDR5-only requirement on AM5 raises platform cost versus older AM4 builds.",
    ],
    recommendedFor: "Buyers who want a long CPU-only upgrade runway, or anyone considering an X3D chip for maximum gaming frame rates.",
  },
  right: {
    name: "Intel (Core, current-gen platform)",
    architecture: "Performance and efficiency core hybrid design on Intel's current socket.",
    vramOrCache: "Strong per-core performance; cache configuration varies by SKU.",
    performanceCategory: "Strong across budget to high-end, particularly competitive in productivity-plus-gaming workloads.",
    powerConsumption: "Higher-end SKUs can draw noticeably more power under sustained load than AMD equivalents.",
    targetResolution: "Competitive at every resolution tier, same as AMD.",
    strengths: [
      "Often cheaper motherboards at the budget tier.",
      "Strong multi-threaded performance for buyers who also do productivity work.",
      "Wide range of SKUs at nearly every price point.",
    ],
    weaknesses: [
      "Platform upgrade path is typically shorter before a socket change is needed.",
      "Higher-end chips can run hot and power-hungry under sustained load without good cooling.",
    ],
    recommendedFor: "Buyers prioritising up-front platform cost or who also use the PC for multi-threaded productivity work.",
  },
  verdict:
    "For a gaming-first build, check current motherboard and CPU pricing in your specific budget tier rather than picking a brand outright — the gap between the two is usually decided by platform cost, not raw gaming performance. If a long CPU-only upgrade path matters to you, AMD's AM5 platform currently has the clearer commitment.",
  faqs: [
    {
      question: "Which is better for gaming, AMD or Intel?",
      answer:
        "Both are competitive at every price point. The practical difference is usually platform cost and upgrade path rather than a clear gaming performance winner.",
    },
    {
      question: "What is an X3D chip and does it matter for gaming?",
      answer:
        "AMD's X3D chips add extra cache that particularly benefits cache-sensitive games, often giving a real frame-rate advantage over similarly priced non-X3D chips in those titles specifically.",
    },
    {
      question: "Should I buy based on CPU alone or the whole platform?",
      answer:
        "The whole platform — motherboard pricing, RAM type required, and upgrade path all affect the real cost and value of a CPU choice, not just the chip's own price.",
    },
  ],
  relatedBuilds: ["75000", "100000"],
  relatedGuides: [{ label: "CPU buying guide", href: "/components/cpu" }],
  lastUpdated: "2026-08-01",
};
