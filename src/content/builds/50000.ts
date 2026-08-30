import type { GamingPCBuild } from "@/types";

export const build50000: GamingPCBuild = {
  slug: "50000",
  budget: 50000,
  title: "Best Gaming PC Under ₹50,000 in India",
  metaDescription:
    "A value-focused ₹50,000 used-AM4 gaming PC build for 1080p gaming, with current Indian market estimates.",
  intro:
    "At ₹50,000, used AM4 parts keep the money focused on a capable 1080p GPU while new power, storage and airflow parts protect reliability.",
  summary:
    "A used Ryzen 5 5600-class AM4 platform paired with a used RX 6600/RTX 2060-class GPU, 16GB RAM and new NVMe storage.",
  targetResolution: "1080p",
  components: [
    {
      category: "CPU",
      name: "AMD Ryzen 5 5600",
      reason:
        "Six cores is the practical minimum for a build that should still feel current in three to four years, and the AM4 platform keeps the motherboard cheap.",
      priceRangeINR: [7000, 9000], condition: "used", priceNote: "Typical tested resale estimate; prefer a bill or remaining warranty.",
    },
    {
      category: "GPU",
      name: "Used Radeon RX 6600 8GB / GeForce RTX 2060 6GB",
      reason:
        "The single biggest lever on gaming performance at this budget. A 6GB-class card handles 1080p esports comfortably and AAA titles at medium settings.",
      priceRangeINR: [14000, 19000], condition: "used", priceNote: "Inspect temperatures, fans and artifact-free stress-test results.",
    },
    {
      category: "Motherboard",
      name: "A520 (AM4) motherboard",
      reason:
        "Enough VRM headroom for a 6-core CPU with no need for the extra features a B550 board charges for at this budget.",
      priceRangeINR: [4500, 6500], condition: "used", priceNote: "Confirm BIOS support, M.2 slot condition and I/O before buying.",
    },
    {
      category: "RAM",
      name: "16GB (2x8GB) DDR4-3200",
      reason:
        "Dual-channel matters more than raw capacity for gaming frame rates; 16GB is the floor for a smooth modern desktop plus games.",
      priceRangeINR: [2500, 3500], condition: "used",
    },
    {
      category: "Storage",
      name: "500GB NVMe SSD",
      reason:
        "Fast boot and load times without the premium of a 1TB drive; expect to add a second drive later as your library grows.",
      priceRangeINR: [4500, 6000], condition: "new",
    },
    {
      category: "PSU",
      name: "500W 80+ Bronze (non-modular)",
      reason:
        "Rated headroom above the system's real draw, from a brand with a genuine warranty rather than an unbranded unit.",
      priceRangeINR: [3500, 5000], condition: "new", priceNote: "Use a reputable model with a real Indian warranty.",
    },
    {
      category: "Case",
      name: "Mid-tower with front mesh panel",
      reason: "Airflow matters more than looks at this budget — a mesh front keeps temperatures in check with stock coolers.",
      priceRangeINR: [3000, 4500], condition: "new",
    },
    {
      category: "CPU Cooler",
      name: "Stock cooler (bundled)",
      condition: "bundled",
      reason:
        "The 5600's bundled cooler is sufficient for stock clocks; an aftermarket cooler is a better upgrade-path spend than a budget one now.",
    },
  ],
  performance: {
    "1080p": {
      rating: 4,
      note: "Smooth in esports titles (Valorant, CS2, Dota 2) at high refresh rates. AAA games run well at medium settings.",
    },
    "1440p": {
      rating: 2,
      note: "Playable in lighter titles with settings turned down, but this build is not built for 1440p as a primary target.",
    },
    "4k": {
      rating: 1,
      note: "Not a realistic target at this budget — expect low frame rates even at reduced settings.",
    },
  },
  whyTheseComponents:
    "This build prioritises the GPU and CPU over case aesthetics and drive capacity, because those two parts set the frame rate ceiling. Every other component was chosen to be 'just enough' so the budget could go toward the parts that actually move performance.",
  upgradePath:
    "The most impactful upgrade is the GPU. The AM4 platform can later accept a Ryzen 7 5700X3D-class chip, while the new PSU provides room for a stronger card.",
  alternatives: [
    {
      component: "GPU",
      alternative: "Intel Arc A580 (where locally available)",
      tradeoff: "Can offer stronger rasterisation for the price but driver maturity varies by game — check recent reviews for your specific titles.",
    },
    {
      component: "CPU",
      alternative: "AMD Ryzen 5 4500",
      tradeoff: "Saves roughly ₹2,000–3,000 but loses some single-core performance that matters in CPU-bound esports titles.",
    },
  ],
  ifBudgetChanges:
    "If you can stretch to ₹60,000–75,000, the extra budget is best spent moving to an 8GB-class GPU before anything else — see the ₹75,000 build.",
  faqs: [
    {
      question: "Can this PC run modern AAA games?",
      answer:
        "Yes, at 1080p with settings set to medium and upscaling enabled where the game supports it. It is not built for maxed-out settings in the newest releases.",
    },
    {
      question: "What should I check when buying used parts?",
      answer:
        "Ask for a stress test, temperatures, serial number, original bill and remaining warranty. Avoid cards with artifacts, damaged fans or vague seller histories.",
    },
    {
      question: "Is 16GB of RAM enough in 2026?",
      answer:
        "For gaming specifically, yes. Some modern titles and background apps can push past 16GB during heavy multitasking, which is why the motherboard here supports an easy upgrade to 32GB later.",
    },
  ],
  relatedBuilds: ["75000", "100000"],
  relatedGuides: [
    { label: "how much RAM do you need for gaming?", href: "/guides/how-much-ram-for-gaming" },
    { label: "1080p gaming guide", href: "/guides/1080p-gaming" },
  ],
  lastUpdated: "2026-08-30",
  pricesChecked: "2026-08-30",
};
