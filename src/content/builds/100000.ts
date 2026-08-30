import type { GamingPCBuild } from "@/types";

export const build100000: GamingPCBuild = {
  slug: "100000",
  budget: 100000,
  title: "Best Gaming PC Under ₹1,00,000 in India",
  metaDescription:
    "A ₹1,00,000 used-AM4 gaming PC build aimed at 1440p, with current Indian market estimates and transparent condition labels.",
  intro:
    "₹1,00,000 is the top of the value AM4 range: used CPU, board, memory and GPU maximise 1440p performance, while new storage and power hardware protect reliability.",
  summary:
    "A used Ryzen 7 5700X3D-class AM4 CPU with a used RTX 4070/RX 7800 XT-class GPU, 32GB DDR4 and new 1TB NVMe storage.",
  targetResolution: "1440p",
  components: [
    {
      category: "CPU",
      name: "Used AMD Ryzen 7 5700X3D",
      reason: "The AM4 gaming upgrade that makes sense at this ceiling: extra cache improves CPU-limited games without forcing a DDR5 platform rebuild.",
      priceRangeINR: [12000, 16000], condition: "used", priceNote: "Prefer a tested chip with bill or remaining warranty.",
    },
    {
      category: "GPU",
      name: "Used GeForce RTX 4070 12GB / Radeon RX 7800 XT 16GB",
      reason: "A genuinely strong 1440p card with 12GB of VRAM, enough headroom for high settings and ray tracing with upscaling.",
      priceRangeINR: [40000, 52000], condition: "used", priceNote: "Check hotspot temperature, fans, ports and stress-test footage.",
    },
    {
      category: "Motherboard",
      name: "B550 (AM4) motherboard",
      reason: "A tested B550 board supplies PCIe 4.0 and the right BIOS support for the 5700X3D without spending on a new platform.",
      priceRangeINR: [6500, 9500], condition: "used", priceNote: "Confirm 5700X3D BIOS support and all M.2/RAM slots.",
    },
    {
      category: "RAM",
      name: "32GB (2x16GB) DDR4-3200/3600",
      reason: "Used DDR4 keeps this AM4 build practical while 32GB provides comfortable headroom for modern games and multitasking.",
      priceRangeINR: [5000, 7500], condition: "used",
    },
    {
      category: "Storage",
      name: "1TB NVMe Gen4 SSD",
      reason: "Gen4 speeds pair well with the platform and 1TB covers a substantial modern game library.",
      priceRangeINR: [5500, 7500], condition: "new",
    },
    {
      category: "PSU",
      name: "650W 80+ Bronze",
      reason: "Headroom for the RTX 4070's peak draw plus a CPU upgrade down the line.",
      priceRangeINR: [6500, 8500], condition: "new", priceNote: "Use a reputable model with suitable GPU connectors and warranty.",
    },
    {
      category: "Case",
      name: "Mid-tower with front mesh panel",
      reason: "Airflow-focused case with room for an additional fan if you later add a stronger cooler.",
      priceRangeINR: [4000, 5500], condition: "new",
    },
    {
      category: "CPU Cooler",
      name: "Tower air cooler",
      reason: "A capable tower cooler keeps the high-cache AM4 CPU quiet under sustained gaming without AIO cost or pump risk.",
      priceRangeINR: [2500, 4000], condition: "new",
    },
  ],
  performance: {
    "1080p": { rating: 5, note: "Maxed-out settings in almost every current title, well past 144fps in most esports games." },
    "1440p": { rating: 5, note: "High to maxed settings in most titles, with ray tracing usable via upscaling in demanding games." },
    "4k": { rating: 2, note: "Playable with upscaling and reduced settings in lighter titles, but not this build's target resolution." },
  },
  whyTheseComponents:
    "This is deliberately the last AM4 tier: used platform parts maximise the GPU budget, while the 5700X3D remains a strong gaming CPU for the life of the build.",
  upgradePath:
    "The next platform upgrade is AM5, which will require a new motherboard and DDR5. Until then, a future GPU upgrade is the simplest way to extend 1440p life.",
  alternatives: [
    { component: "GPU", alternative: "AMD Radeon RX 7700 XT", tradeoff: "Comparable or better rasterisation performance for similar money, with weaker ray tracing and upscaling maturity." },
    { component: "CPU", alternative: "Used AMD Ryzen 5 5600 (reallocate savings to GPU)", tradeoff: "Lower CPU cost, but less minimum-frame-rate headroom in CPU-heavy games." },
  ],
  ifBudgetChanges:
    "At ₹1,25,000–1,50,000 the natural next step is a 16GB-class GPU for a build that stays comfortable at 1440p for longer and starts to make sense for 4K in lighter titles.",
  faqs: [
    {
      question: "Is 32GB of RAM overkill for gaming?",
      answer:
        "For gaming alone, 16GB can work, but 32GB is the safer choice for modern games, browser tabs, streaming and background applications.",
    },
    {
      question: "Can this PC handle 4K gaming?",
      answer:
        "It can run lighter titles at 4K with upscaling, but it's built around 1440p as the primary target — for a dedicated 4K build, look at the ₹1,50,000+ tier.",
    },
    {
      question: "Why AM5 instead of the cheaper AM4 platform?",
      answer:
        "AM4 is used here because it leaves more of the budget for the GPU. AM5 begins above this tier, where the larger platform cost is easier to absorb.",
    },
  ],
  relatedBuilds: ["75000", "150000"],
  relatedGuides: [
    { label: "1440p gaming guide", href: "/guides/1440p-gaming" },
    { label: "how much RAM do you need for gaming?", href: "/guides/how-much-ram-for-gaming" },
  ],
  lastUpdated: "2026-08-30",
  pricesChecked: "2026-08-30",
};
