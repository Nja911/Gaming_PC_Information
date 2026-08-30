import type { Comparison } from "@/types";
import { marketSources } from "@/content/builds/researched";

function comparison(slug: string, title: string, left: string, right: string, verdict: string): Comparison {
  return {
    slug, title, metaDescription: `${title}: a practical comparison for Indian gaming PC buyers.`, intro: `A decision-focused comparison of ${left} and ${right}, including platform, price and use-case trade-offs.`,
    left: { name: left, architecture: "Current or established consumer platform", performanceCategory: "Depends on the exact model and game", powerConsumption: "Check the specific model's rated power", targetResolution: "Match to the GPU and display", strengths: ["Available across multiple budgets", "Can be the better value at the right price"], weaknesses: ["No universal winner", "Retail and used prices change"], recommendedFor: "Buyers comparing the actual models available to them" },
    right: { name: right, architecture: "Current or established consumer platform", performanceCategory: "Depends on the exact model and game", powerConsumption: "Check the specific model's rated power", targetResolution: "Match to the GPU and display", strengths: ["A credible alternative at the right price", "Different upgrade or feature trade-offs"], weaknesses: ["Availability varies by retailer", "Specification advantage may not matter in every game"], recommendedFor: "Buyers who value the competing platform's specific strengths" },
    verdict, faqs: [{ question: "Which one should I buy?", answer: verdict }, { question: "Are these prices permanent?", answer: "No. Check the linked retailer and used-market sources on the day you buy." }], relatedBuilds: ["75000", "100000", "150000"], relatedGuides: [], lastUpdated: "2026-08-30", sources: marketSources,
  };
}

export const researchedComparisons: Comparison[] = [
  comparison("ram-16gb-vs-32gb", "16GB vs 32GB RAM for Gaming", "16GB RAM", "32GB RAM", "Choose 16GB when the budget is tight and gaming is focused; choose 32GB for modern games plus browsers, streaming and multitasking."),
  comparison("ddr4-vs-ddr5", "DDR4 vs DDR5 for Gaming PCs", "DDR4 / AM4", "DDR5 / AM5", "DDR4 and AM4 maximise value in lower tiers; DDR5 and AM5 cost more but provide the current CPU upgrade path."),
  comparison("custom-vs-prebuilt", "Custom PC vs Prebuilt Gaming PC", "Custom build", "Prebuilt system", "Choose custom when you can verify every part and want upgrade control; choose a prebuilt only when its exact PSU, motherboard, cooling and warranty are disclosed."),
];
