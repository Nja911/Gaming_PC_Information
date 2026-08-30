import type { Guide } from "@/types";

export const guideRam: Guide = {
  slug: "how-much-ram-for-gaming",
  title: "How Much RAM Do You Need for Gaming?",
  metaDescription:
    "16GB vs 32GB for gaming — what actually changes, and when the extra capacity or speed is worth paying for.",
  cluster: "PC Building Guides",
  intro:
    "16GB is the practical floor for gaming in 2026; 32GB is where most builds land once you account for background apps, browser tabs and the occasional heavier multitasking session.",
  sections: [
    {
      heading: "16GB vs 32GB",
      body: "16GB is enough for gaming alone in the large majority of current titles. 32GB matters more once you're streaming, running a browser with many tabs, or using creative software alongside games — and DDR5 kits have made 32GB affordable enough that many mid-range builds default to it.",
    },
    {
      heading: "Does RAM speed matter for gaming?",
      body: "Yes, more than capacity beyond the 16GB/32GB decision. Faster RAM (especially on AMD's AM5 platform) can measurably improve frame rates, particularly in CPU-bound scenarios.",
    },
    {
      heading: "Dual-channel vs single-channel",
      body: "Always run RAM in a matched dual-channel kit (two sticks) rather than a single stick of the same total capacity — dual-channel meaningfully improves gaming performance and is effectively free to configure correctly.",
    },
  ],
  faqs: [
    {
      question: "Is 8GB of RAM enough for gaming in 2026?",
      answer:
        "No — 8GB is now a bottleneck in many current titles and modern operating systems. 16GB is the realistic minimum for a new gaming PC.",
    },
    {
      question: "Should I buy one 32GB stick or two 16GB sticks?",
      answer:
        "Two 16GB sticks, run in dual-channel — this is faster than a single stick of equivalent total capacity for essentially the same price.",
    },
  ],
  relatedBuilds: ["50000", "100000"],
  relatedGuides: [{ label: "1080p gaming guide", href: "/guides/1080p-gaming" }],
  relatedComponents: [{ label: "component buying guides", href: "/components" }],
  lastUpdated: "2026-08-01",
};
