import type { GamingPCBuild } from "@/types";

export const build150000: GamingPCBuild = {
  slug: "150000",
  budget: 150000,
  title: "Best Gaming PC Under ₹1,50,000 in India",
  metaDescription:
    "A ₹1,50,000 gaming PC build for high-refresh 1440p and entry-level 4K, with a 16GB-class GPU and full component reasoning.",
  intro:
    "₹1,50,000 buys a build that treats 1440p as effortless and makes 4K a realistic option in most titles, built around a 16GB-class GPU and a strong 8-core CPU.",
  summary:
    "An 8-core Ryzen CPU with a 16GB-class GPU, 32GB of RAM and a 1TB Gen4 NVMe drive. Maxed 1440p and genuinely playable 4K.",
  targetResolution: "4k",
  components: [
    {
      category: "CPU",
      name: "AMD Ryzen 7 7700",
      reason:
        "Eight cores removes any CPU-side bottleneck for this GPU tier and holds up well for streaming or heavier multitasking.",
      priceRangeINR: [19000, 22000], condition: "new", priceNote: "Current boxed-retail estimate; confirm stock before purchase.",
    },
    {
      category: "GPU",
      name: "NVIDIA GeForce RTX 4070 Ti Super",
      reason:
        "A 16GB-class card that comfortably maxes 1440p and handles 4K well in the large majority of titles with upscaling.",
      priceRangeINR: [70000, 90000], condition: "new", priceNote: "Availability is inconsistent; RTX 4070 Ti Super listings can be out of stock.",
    },
    {
      category: "Motherboard",
      name: "B650 (AM5) motherboard",
      reason:
        "Sufficient VRM quality for this CPU tier without paying for X670 features most gamers won't use.",
      priceRangeINR: [14000, 16500], condition: "new",
    },
    {
      category: "RAM",
      name: "32GB (2x16GB) DDR5-6000",
      reason:
        "A faster kit than the ₹1,00,000 build to match AM5's sensitivity to memory speed for gaming performance.",
      priceRangeINR: [18000, 24000], condition: "new", priceNote: "DDR5 pricing is volatile; verify the kit price before checkout.",
    },
    {
      category: "Storage",
      name: "1TB NVMe Gen4 SSD",
      reason:
        "Fast enough to avoid being a bottleneck; add a second drive later if your library outgrows it.",
      priceRangeINR: [6500, 9000], condition: "new",
    },
    {
      category: "PSU",
      name: "750W 80+ Gold",
      reason:
        "Headroom for this GPU's peak draw with an efficiency tier that keeps running costs and heat down.",
      priceRangeINR: [7500, 10000], condition: "new",
    },
    {
      category: "Case",
      name: "Mid-tower with high-airflow front panel",
      reason:
        "Higher-wattage components benefit from a case built around airflow rather than a fully glass front.",
      priceRangeINR: [4500, 6500], condition: "new",
    },
    {
      category: "CPU Cooler",
      name: "240mm AIO liquid cooler",
      reason:
        "Keeps the 8-core CPU cool and quiet under sustained load, which an air cooler can struggle with at this power tier.",
      priceRangeINR: [3500, 5500], condition: "new",
    },
  ],
  performance: {
    "1080p": {
      rating: 5,
      note: "Maxed settings with high refresh rates in essentially every current title.",
    },
    "1440p": {
      rating: 5,
      note: "Maxed settings including ray tracing in most titles, comfortably above 100fps in many.",
    },
    "4k": {
      rating: 4,
      note: "High settings with upscaling in most titles; the most demanding ray-traced games may need settings turned down.",
    },
  },
  whyTheseComponents:
    "The CPU moves to 8 cores here because at this GPU tier a 6-core chip can start to hold back frame rates in CPU-heavy titles. The cooler and PSU are upgraded to match the extra heat and power draw.",
  upgradePath:
    "This build has real headroom — the next meaningful upgrade for most users is the GPU alone, a couple of years out, to push further into 4K.",
  alternatives: [
    {
      component: "GPU",
      alternative: "AMD Radeon RX 7900 GRE",
      tradeoff:
        "Strong rasterisation performance for similar or less money, with a smaller ray tracing and upscaling advantage than NVIDIA's stack.",
    },
    {
      component: "Cooler",
      alternative: "High-end tower air cooler",
      tradeoff:
        "Slightly less thermal headroom than the AIO but no pump to eventually replace, and typically quieter at idle.",
    },
  ],
  ifBudgetChanges:
    "Beyond ₹2,00,000, the sensible next step is a flagship-tier GPU for a build built specifically around 4K rather than 4K as a strong secondary target.",
  faqs: [
    {
      question: "Is this a true 4K gaming PC?",
      answer:
        "It's genuinely capable at 4K in most titles with upscaling, though the most demanding new releases may need settings turned down. For 4K with no compromises, look at the ₹2,00,000+ tier.",
    },
    {
      question: "Why liquid cooling instead of air at this budget?",
      answer:
        "The 8-core CPU can draw significant power under sustained load; an AIO keeps temperatures and noise in check more comfortably than most air coolers at this price.",
    },
    {
      question: "Is a 750W PSU enough?",
      answer:
        "Yes — it gives comfortable headroom above this system's real-world peak draw, including some margin for a future GPU upgrade.",
    },
  ],
  relatedBuilds: ["100000"],
  relatedGuides: [
    { label: "1440p gaming guide", href: "/guides/1440p-gaming" },
  ],
  lastUpdated: "2026-08-30",
  pricesChecked: "2026-08-30",
};
