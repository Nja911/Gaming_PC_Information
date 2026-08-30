import type { Guide } from "@/types";

export const guide1080p: Guide = {
  slug: "1080p-gaming",
  title: "1080p Gaming: The Realistic Starting Point",
  metaDescription:
    "Why 1080p remains the most common and most cost-effective gaming resolution, and what hardware makes the most of it.",
  cluster: "1080p Gaming",
  intro:
    "1080p is still the most-used gaming resolution, and for good reason — it needs the least GPU power for a given frame rate, leaving budget free for higher refresh rates or a stronger CPU.",
  sections: [
    {
      heading: "What GPU do you need for 1080p?",
      body: "A 6GB-class card is enough for esports titles and medium-settings AAA gaming. An 8GB-class card unlocks high settings across almost everything current, with room to spare for upscaling and light ray tracing.",
    },
    {
      heading: "Does 1080p make the CPU matter more?",
      body: "Yes — at 1080p the GPU has an easier time, so the CPU is more often the limiting factor, especially in competitive titles that prize high, stable frame rates over visual fidelity.",
    },
    {
      heading: "High refresh rate or higher settings?",
      body: "At 1080p, hardware costs are low enough that many players can have both a strong settings profile and a 144Hz+ monitor, which is why 1080p remains the default choice for competitive gaming.",
    },
  ],
  faqs: [
    {
      question: "Is 1080p still good in 2026?",
      answer:
        "Yes, particularly for competitive and esports gaming, where high, stable frame rates matter more than resolution, and for budgets where a 1440p-capable GPU isn't realistic.",
    },
    {
      question: "What monitor refresh rate should I pair with a 1080p build?",
      answer:
        "144Hz is a sensible baseline for competitive titles at this resolution, since even budget-tier GPUs can often exceed 100fps in esports games.",
    },
  ],
  relatedBuilds: ["50000", "75000"],
  relatedGuides: [{ label: "1440p gaming guide", href: "/guides/1440p-gaming" }],
  relatedComponents: [
    { label: "best GPU for 1080p gaming", href: "/components/gpu" },
    { label: "best CPU for gaming", href: "/components/cpu" },
  ],
  lastUpdated: "2026-08-01",
};
