import type { ComponentCategory } from "@/types";

export const cpu: ComponentCategory = {
  slug: "cpu",
  name: "Processor (CPU)",
  shortName: "CPU",
  title: "Best CPUs for Gaming in India",
  metaDescription:
    "How to choose a gaming CPU — core counts, platform longevity and when the CPU actually matters more than the GPU.",
  intro:
    "For most gaming budgets the GPU decides your frame rate, but the CPU decides your floor — it sets minimum frame rates in CPU-heavy titles and how long the platform stays relevant.",
  whatMatters: [
    "Core count matched to your GPU tier — a 6-core chip is fine paired with an 8GB-class GPU, but can start to hold back a 16GB-class card.",
    "Platform longevity — AM5 (AMD) and recent Intel sockets give a longer runway to upgrade the CPU alone later without replacing the motherboard.",
    "Single-core performance, which still drives frame rates in many esports and simulation titles more than core count does.",
    "Stock cooling included or not, and whether it's sufficient for the chip's power draw under sustained gaming load.",
  ],
  budgetTiers: [
    { tier: "Entry (6-core, previous-gen platform)", guidance: "Pairs well with 6–8GB-class GPUs — see the ₹50,000–75,000 builds." },
    { tier: "Value ceiling (8-core, used AM4)", guidance: "A 5700X3D-class used chip pairs with a 12GB–16GB GPU while keeping the ₹1,00,000 build affordable." },
    { tier: "Upper mid-range (8-core)", guidance: "Removes CPU bottlenecks for 16GB-class GPUs — see the ₹1,50,000 build." },
  ],
  compatibilityNotes: [
    "The CPU socket must match the motherboard chipset — check this before buying either part in isolation.",
    "Some motherboards need a BIOS update for newer CPUs in the same socket family; check the board's supported CPU list.",
    "Higher-core CPUs generally need better cooling and a PSU with a bit more headroom.",
  ],
  commonMistakes: [
    "Overspending on a high-core-count CPU while pairing it with a GPU that can't use the extra performance.",
    "Ignoring platform upgrade path and ending up needing a full motherboard-and-RAM swap for a modest CPU upgrade later.",
    "Assuming a stock cooler is fine for every chip in a range — some SKUs run notably hotter under load.",
  ],
  faqs: [
    {
      question: "AMD or Intel for gaming?",
      answer:
        "Both are competitive across price points; the practical difference usually comes down to platform pricing and upgrade path rather than raw gaming performance. See our AMD vs Intel comparison for specifics.",
    },
    {
      question: "How many cores do I need for gaming?",
      answer:
        "Six cores is a comfortable baseline for current games. Eight cores helps more with streaming, heavy background multitasking, and removes bottlenecks for higher-end GPUs.",
    },
    {
      question: "Does CPU matter less than GPU for gaming?",
      answer:
        "For raw frame rates at higher resolutions, yes, the GPU usually matters more. At 1080p and in CPU-heavy titles, the CPU can matter just as much.",
    },
  ],
  relatedBuilds: ["50000", "75000", "100000", "150000"],
  relatedGuides: [{ label: "1080p gaming guide", href: "/guides/1080p-gaming" }],
  lastUpdated: "2026-08-30",
};
