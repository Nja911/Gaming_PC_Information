import type { Comparison } from "@/types";

export const nvidiaVsAmdGpu: Comparison = {
  slug: "nvidia-vs-amd-gpu",
  title: "NVIDIA vs AMD GPUs: Which Should You Buy?",
  metaDescription:
    "How NVIDIA and AMD graphics cards actually compare for gaming — ray tracing, upscaling, rasterisation performance and price.",
  intro:
    "At any given price point, the two brands usually trade blows on raw rasterisation performance. The meaningful differences are in software features and where each brand tends to price more aggressively.",
  left: {
    name: "NVIDIA (GeForce RTX)",
    architecture: "Dedicated ray tracing and tensor cores across the current lineup.",
    vramOrCache: "VRAM varies by tier; flagship and upper-mid cards tend to offer more generous capacities.",
    performanceCategory: "Strong rasterisation with a clear lead in ray tracing and upscaling image quality.",
    powerConsumption: "Generally efficient per frame, especially with upscaling enabled.",
    targetResolution: "Competitive from 1080p through 4K depending on tier.",
    strengths: [
      "Mature upscaling technology with broad game support.",
      "Stronger ray tracing performance across the lineup.",
      "Wide driver and software ecosystem support.",
    ],
    weaknesses: [
      "Often commands a price premium over AMD at similar rasterisation performance.",
      "VRAM can be comparatively tight on some lower and mid-tier SKUs.",
    ],
    recommendedFor: "Buyers who play titles with strong ray tracing implementations or who prioritise upscaling image quality.",
  },
  right: {
    name: "AMD (Radeon RX)",
    architecture: "Strong rasterisation-focused architecture with a growing upscaling feature set.",
    vramOrCache: "Often more generous VRAM at a given price point than the NVIDIA equivalent.",
    performanceCategory: "Excellent rasterisation performance per rupee; ray tracing is usable but generally behind NVIDIA's best.",
    powerConsumption: "Competitive, though flagship-tier cards can draw more power than NVIDIA equivalents at similar performance.",
    targetResolution: "Competitive from 1080p through 4K depending on tier.",
    strengths: [
      "Frequently stronger rasterisation performance per rupee.",
      "More generous VRAM at a given price tier in many cases.",
      "Open-source-friendly driver stack with broad compatibility.",
    ],
    weaknesses: [
      "Ray tracing performance typically trails NVIDIA's equivalent tier.",
      "Upscaling image quality has closed the gap but is not universally considered equal yet.",
    ],
    recommendedFor: "Buyers who prioritise rasterisation performance per rupee and don't rely heavily on ray tracing.",
  },
  verdict:
    "If ray tracing and upscaling image quality in your specific games matter to you, NVIDIA currently has the edge. If you're optimising for rasterisation performance and VRAM per rupee, AMD is frequently the stronger buy at the same price point — check current reviews for the exact cards you're comparing, since positioning shifts with each generation.",
  faqs: [
    {
      question: "Is ray tracing worth paying extra for?",
      answer:
        "It depends on the games you play — in titles with well-implemented ray tracing it's a real visual upgrade, but many competitive and older titles won't benefit from it at all.",
    },
    {
      question: "Does more VRAM always mean better gaming performance?",
      answer:
        "No — VRAM capacity prevents stuttering from running out of memory at a given resolution and settings, but it doesn't substitute for the underlying GPU's raw performance.",
    },
  ],
  relatedBuilds: ["75000", "100000", "150000"],
  relatedGuides: [{ label: "GPU buying guide", href: "/components/gpu" }],
  lastUpdated: "2026-08-01",
};
