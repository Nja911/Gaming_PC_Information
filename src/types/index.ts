// Central content model. Keeping data typed and separate from presentation
// is what lets this site scale from a handful of pages to hundreds without
// touching the page components themselves.

export type Resolution = "1080p" | "1440p" | "4k";

export type PerformanceRating = 1 | 2 | 3 | 4 | 5;

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BuildComponent {
  id?: string;
  category:
    | "CPU"
    | "GPU"
    | "Motherboard"
    | "RAM"
    | "Storage"
    | "PSU"
    | "Case"
    | "CPU Cooler";
  name: string;
  /** One line on why this part was chosen for this build. */
  reason: string;
  /** Approximate price in INR. Always presented as an estimate. */
  priceINR?: number;
  /** Low and high market estimate in INR. */
  priceRangeINR?: [number, number];
  condition?: "new" | "used" | "bundled";
  priceNote?: string;
  sourceIds?: string[];
}

export type SourceType = "retailer" | "used-market" | "manufacturer" | "benchmark" | "editorial";

export interface Source {
  id: string;
  name: string;
  type: SourceType;
  url: string;
  accessedAt: string;
  supports: string;
}

export interface PriceSnapshot {
  low: number;
  high: number;
  currency: "INR";
  condition: "new" | "used" | "bundled";
  checkedAt: string;
  sourceIds: string[];
}

export interface UpgradeStep {
  timeframe: string;
  priority: number;
  action: string;
}

export interface RelatedLink {
  label: string;
  href: string;
}

export interface GamingPCBuild {
  slug: string;
  /** Budget in INR, used for routing and sorting. */
  budget: number;
  title: string;
  metaDescription: string;
  /** One or two sentence dek shown under the H1. */
  intro: string;
  summary: string;
  targetResolution: Resolution;
  components: BuildComponent[];
  performance: Record<Resolution, { rating: PerformanceRating; note: string }>;
  whyTheseComponents: string;
  upgradePath: string;
  alternatives: { component: string; alternative: string; tradeoff: string }[];
  ifBudgetChanges: string;
  faqs: FAQItem[];
  relatedBuilds: string[]; // slugs
  relatedGuides: RelatedLink[];
  lastUpdated: string; // ISO date
  pricesChecked: string; // ISO date
  budgetRange?: [number, number];
  targetResolutions?: Resolution[];
  targetFPS?: string;
  audience?: string[];
  useCases?: string[];
  sacrifices?: string[];
  whoShouldBuy?: string[];
  whoShouldAvoid?: string[];
  sources?: Source[];
  pricing?: PriceSnapshot;
  confidence?: "high" | "medium" | "low";
  tested?: boolean;
  upgradeSteps?: UpgradeStep[];
}

export interface ComponentCategory {
  slug: string;
  name: string; // "Graphics Card (GPU)"
  shortName: string; // "GPU"
  title: string;
  metaDescription: string;
  intro: string;
  whatMatters: string[];
  budgetTiers: { tier: string; guidance: string }[];
  compatibilityNotes: string[];
  commonMistakes: string[];
  faqs: FAQItem[];
  relatedBuilds: string[];
  relatedGuides: RelatedLink[];
  lastUpdated: string;
  sources?: Source[];
}

export interface Guide {
  slug: string;
  title: string;
  metaDescription: string;
  cluster: string; // topical cluster this guide belongs to, e.g. "1440p Gaming"
  intro: string;
  sections: { heading: string; body: string }[];
  faqs: FAQItem[];
  relatedBuilds: string[];
  relatedGuides: RelatedLink[];
  relatedComponents: RelatedLink[];
  lastUpdated: string;
  sources?: Source[];
}

export interface ComparisonSide {
  name: string;
  architecture: string;
  vramOrCache?: string;
  performanceCategory: string;
  powerConsumption: string;
  targetResolution: string;
  strengths: string[];
  weaknesses: string[];
  recommendedFor: string;
}

export interface Comparison {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  left: ComparisonSide;
  right: ComparisonSide;
  verdict: string;
  faqs: FAQItem[];
  relatedBuilds: string[];
  relatedGuides: RelatedLink[];
  lastUpdated: string;
  sources?: Source[];
}
