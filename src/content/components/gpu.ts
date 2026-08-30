import type { ComponentCategory } from "@/types";

export const gpu: ComponentCategory = {
  slug: "gpu",
  name: "Graphics Card (GPU)",
  shortName: "GPU",
  title: "Best Graphics Cards (GPU) for Gaming in India",
  metaDescription:
    "How to choose a gaming GPU by resolution and budget, with VRAM guidance, compatibility notes and common mistakes to avoid.",
  intro:
    "The GPU has the single biggest impact on gaming frame rates of any component in the PC. Almost every rupee of a gaming-first budget should be weighed against 'could this go to the GPU instead?'",
  whatMatters: [
    "Target resolution first — a card sized for 1080p is wasted at 4K, and a 4K-class card is overkill if you're gaming at 1080p.",
    "VRAM capacity — 8GB is a reasonable 1080p/entry-1440p floor for current titles; 12GB+ is more future-proof at 1440p and above.",
    "Real-world power draw and the PSU headroom it needs, not just the card's sticker price.",
    "Upscaling and ray tracing support if those matter to the games you actually play — treat them as a bonus, not the deciding factor.",
    "Physical size versus your case's clearance, especially for larger triple-fan cards.",
  ],
  budgetTiers: [
    { tier: "Budget (6GB-class)", guidance: "1080p esports and medium-settings AAA gaming — see the ₹50,000 build." },
    { tier: "Mid-range (8GB-class)", guidance: "High-settings 1080p and usable 1440p — see the ₹75,000 build." },
    { tier: "Upper mid-range (12GB–16GB used)", guidance: "Comfortable 1440p as a primary target using used AM4 value parts — see the ₹1,00,000 build." },
    { tier: "High-end (16GB-class)", guidance: "Maxed 1440p and genuinely playable 4K — see the ₹1,50,000 build." },
  ],
  compatibilityNotes: [
    "Check your case's maximum GPU length before buying — many current cards exceed 300mm.",
    "Confirm your PSU has the correct PCIe power connectors for the card, and enough rated wattage with headroom.",
    "A PCIe 4.0 or 5.0 slot is backward compatible, so an older motherboard will still run a newer card, just without the extra bandwidth.",
  ],
  commonMistakes: [
    "Buying a GPU far above what your CPU or target resolution can make use of, leaving performance on the table elsewhere.",
    "Ignoring case clearance and PSU connector compatibility until after the card arrives.",
    "Choosing based on VRAM number alone without checking real-world benchmarks for the games you actually play.",
  ],
  faqs: [
    {
      question: "Is more VRAM always better?",
      answer:
        "Not in isolation — a card needs the underlying GPU performance to use that VRAM. More VRAM helps most at higher resolutions and with texture-heavy modern titles, but it won't fix a card that's simply too slow for your target settings.",
    },
    {
      question: "NVIDIA or AMD for gaming?",
      answer:
        "Both make competitive cards at every price point. NVIDIA generally has an edge in ray tracing and upscaling maturity; AMD often offers stronger rasterisation performance per rupee. See our AMD vs Intel and GPU comparison pages for specifics.",
    },
    {
      question: "Should I buy a used GPU?",
      answer:
        "It can be good value from a trustworthy seller with some warranty remaining, but verify the card wasn't used for sustained mining and check return terms before buying.",
    },
  ],
  relatedBuilds: ["50000", "75000", "100000", "150000"],
  relatedGuides: [
    { label: "1440p gaming guide", href: "/guides/1440p-gaming" },
    { label: "1080p gaming guide", href: "/guides/1080p-gaming" },
  ],
  lastUpdated: "2026-08-30",
};
