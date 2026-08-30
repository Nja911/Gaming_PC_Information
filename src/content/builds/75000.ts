import type { GamingPCBuild } from "@/types";

export const build75000: GamingPCBuild = {
  slug: "75000",
  budget: 75000,
  title: "Best Gaming PC Under ₹75,000 in India",
  metaDescription:
    "A ₹75,000 used-AM4 gaming PC build tuned for high-settings 1080p gaming, with current Indian market estimates.",
  intro:
    "₹75,000 is where tested used AM4 parts free enough budget for a strong 1080p GPU, while new storage, PSU and case keep the system dependable.",
  summary:
    "A used Ryzen 5 5600/B550 platform with a used RTX 4060/RX 7600-class GPU, 16GB DDR4 and new 1TB NVMe storage.",
  targetResolution: "1080p",
  components: [
    {
      category: "CPU",
      name: "AMD Ryzen 5 5600",
      reason: "Still the efficient choice here — the GPU is the bottleneck at this tier, not the CPU.",
      priceRangeINR: [7000, 9000], condition: "used", priceNote: "Tested resale estimate; verify bill and warranty.",
    },
    {
      category: "GPU",
      name: "NVIDIA GeForce RTX 4060",
      reason:
        "An 8GB-class current-generation card with upscaling support, giving real 1440p usability in addition to strong 1080p performance.",
      priceRangeINR: [22000, 30000], condition: "used", priceNote: "Require a stress test and check for remaining warranty.",
    },
    {
      category: "Motherboard",
      name: "B550 (AM4) motherboard",
      reason: "PCIe 4.0 support and better VRMs than an A520 board, useful if you upgrade the CPU later.",
      priceRangeINR: [5000, 7500], condition: "used",
    },
    {
      category: "RAM",
      name: "16GB (2x8GB) DDR4-3600",
      reason: "A slightly faster kit than the ₹50,000 build to keep pace with the stronger GPU.",
      priceRangeINR: [3000, 4500], condition: "used",
    },
    {
      category: "Storage",
      name: "1TB NVMe SSD",
      reason: "Modern game install sizes make 1TB the realistic minimum for a library of more than a handful of titles.",
      priceRangeINR: [5500, 7500], condition: "new",
    },
    {
      category: "PSU",
      name: "550W 80+ Bronze",
      reason: "Comfortable headroom above the RTX 4060's real-world draw, with room for a case fan or two.",
      priceRangeINR: [4000, 5500], condition: "new", priceNote: "Choose a reputable model with a real warranty.",
    },
    {
      category: "Case",
      name: "Mid-tower with front mesh panel",
      reason: "Same airflow-first logic as the ₹50,000 build — looks are secondary to keeping temperatures down.",
      priceRangeINR: [3000, 4500], condition: "new",
    },
    {
      category: "CPU Cooler",
      name: "Stock cooler (bundled)",
      condition: "bundled",
      reason: "Sufficient for the 5600 at stock settings; not a priority upgrade at this tier.",
    },
  ],
  performance: {
    "1080p": { rating: 5, note: "High settings across almost all current titles, with ray tracing usable in select games via upscaling." },
    "1440p": { rating: 3, note: "Usable with upscaling enabled and settings at medium-high in most titles." },
    "4k": { rating: 1, note: "Not a realistic target — reserve 4K for the ₹1,50,000+ tier." },
  },
  whyTheseComponents:
    "Used AM4 CPU, board and memory preserve the platform cost advantage, leaving the largest share of this budget for the GPU that determines 1080p quality and 1440p viability.",
  upgradePath:
    "This build's ceiling is the GPU. When you're ready to move to 1440p as a primary resolution, an RTX 4070-class card is the next meaningful step; the rest of the platform can carry over.",
  alternatives: [
    { component: "GPU", alternative: "AMD Radeon RX 7600", tradeoff: "Similar raw performance for slightly less money, with a smaller software feature set for ray tracing and upscaling." },
    { component: "Storage", alternative: "512GB NVMe + 1TB HDD", tradeoff: "Cheaper per gigabyte for a large library, at the cost of slower load times on titles installed to the HDD." },
  ],
  ifBudgetChanges:
    "Going up to ₹1,00,000 mainly buys a stronger used GPU and more memory; the platform remains AM4 through this tier.",
  faqs: [
    {
      question: "Is this build good for 1440p gaming?",
      answer:
        "It's usable at 1440p in most titles with upscaling and medium-high settings, but it isn't built to be a dedicated 1440p rig — for that, look at the ₹1,00,000 tier.",
    },
    {
      question: "Should I upgrade the CPU or GPU first later on?",
      answer:
        "For gaming specifically, the GPU almost always gives the bigger frame-rate improvement first at this tier.",
    },
    {
      question: "Is ray tracing usable on this GPU?",
      answer:
        "In select, well-optimised titles with upscaling enabled, yes. It's not the card's main strength — treat it as a bonus rather than a headline feature.",
    },
  ],
  relatedBuilds: ["50000", "100000"],
  relatedGuides: [
    { label: "1080p gaming guide", href: "/guides/1080p-gaming" },
    { label: "1440p gaming guide", href: "/guides/1440p-gaming" },
  ],
  lastUpdated: "2026-08-30",
  pricesChecked: "2026-08-30",
};
