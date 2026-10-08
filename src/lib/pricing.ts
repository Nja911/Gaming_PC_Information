import type { BuildComponent, GamingPCBuild, LiveComponentPrice } from "@/types";
import { getBuildPricing, pricingSnapshot } from "@/content/pricing";

export interface ResolvedGamingPCBuild extends GamingPCBuild {
  currentBudgetINR: number;
  currentTotalINR: [number, number];
  hasLivePricing: boolean;
}

function resolveComponent(component: BuildComponent, live: LiveComponentPrice | undefined, checkedAt: string): BuildComponent {
  if (!live || component.condition !== live.condition) return component;

  return {
    ...component,
    name: live.name,
    priceRangeINR: [live.low, live.high],
    priceINR: undefined,
    priceNote: `${live.sourceName}: ${live.matchedName}`,
    livePrice: {
      checkedAt,
      sourceName: live.sourceName,
      sourceUrl: live.sourceUrl,
      condition: live.condition,
      originalPriceINR: live.originalPriceINR,
    },
  };
}

export function resolveBuild(build: GamingPCBuild): ResolvedGamingPCBuild {
  const pricing = getBuildPricing(build.slug);
  if (!pricing) {
    const total = build.components.reduce(
      (range, component) => {
        if (component.priceRangeINR) return [range[0] + component.priceRangeINR[0], range[1] + component.priceRangeINR[1]] as [number, number];
        const price = component.priceINR ?? 0;
        return [range[0] + price, range[1] + price] as [number, number];
      },
      [0, 0] as [number, number],
    );
    return { ...build, currentBudgetINR: build.budget, currentTotalINR: total, hasLivePricing: false };
  }

  const resolved = build.components.map((component) => {
    const live = pricing.components[component.category];
    return resolveComponent(component, live, pricingSnapshot.checkedAt);
  });

  const currentSummary = `${resolved.find((component) => component.category === "CPU")?.name ?? "CPU"} paired with ${resolved.find((component) => component.category === "GPU")?.name ?? "GPU"}. Target: ${build.targetResolution}.`;

  return {
    ...build,
    components: resolved,
    summary: currentSummary,
    currentBudgetINR: pricing.budgetINR,
    currentTotalINR: pricing.totalINR,
    hasLivePricing: Object.keys(pricing.components).length > 0,
    budgetRange: pricing.budgetRangeINR,
    pricesChecked: pricingSnapshot.checkedAt,
  };
}

