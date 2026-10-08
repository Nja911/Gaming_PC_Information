import type { BuildComponent, GamingPCBuild, Source } from "@/types";
import { getBuildPricing, pricingSnapshot } from "@/content/pricing";

export const marketSources: Source[] = [
  { id: "md-cpu", name: "MDComputers CPU catalogue", type: "retailer", url: "https://mdcomputers.in/catalog/processor", accessedAt: "2026-08-30", supports: "Indian CPU retail prices and availability" },
  { id: "md-gpu", name: "MDComputers GPU catalogue", type: "retailer", url: "https://mdcomputers.in/catalog/graphics-card", accessedAt: "2026-08-30", supports: "Indian GPU retail prices and availability" },
  { id: "md-b550", name: "MDComputers B550 catalogue", type: "retailer", url: "https://mdcomputers.in/catalog/b550-motherboard", accessedAt: "2026-08-30", supports: "B550 retail pricing" },
  { id: "md-am5", name: "MDComputers AMD catalogue", type: "retailer", url: "https://mdcomputers.in/catalog/amd", accessedAt: "2026-08-30", supports: "AM5 CPU and platform retail pricing" },
  { id: "smartprix", name: "Smartprix component index", type: "retailer", url: "https://www.smartprix.com/computer_components/?cat=all", accessedAt: "2026-08-30", supports: "Cross-retailer Indian component price checks" },
  { id: "getpc-price", name: "GetPC India price catalogue", type: "retailer", url: "https://getpc.co.in/parts/cpu/ryzen-5-5600", accessedAt: "2026-08-30", supports: "Indian CPU and paired-component price checks" },
  { id: "getpc-used", name: "GetPC used-parts guide", type: "used-market", url: "https://getpc.co.in/guides/buying-used-parts-india", accessedAt: "2026-08-30", supports: "Used-part inspection guidance" },
  { id: "amd-specs", name: "AMD processor specifications", type: "manufacturer", url: "https://www.amd.com/en/products/processors/desktops/ryzen.html", accessedAt: "2026-08-30", supports: "Socket and platform specifications" },
  { id: "nvidia-specs", name: "NVIDIA GeForce specifications", type: "manufacturer", url: "https://www.nvidia.com/en-in/geforce/graphics-cards/", accessedAt: "2026-08-30", supports: "GPU memory and feature specifications" },
];

type PriceRange = [number, number];
type Tier = {
  budget: number;
  label: string;
  target: string;
  resolutions: ("1080p" | "1440p" | "4k")[];
  fps: string;
  cpu: string;
  gpu: string;
  motherboard: string;
  ram: string;
  storage: string;
  psu: string;
  case: string;
  cooler: string;
  ranges: [PriceRange, PriceRange, PriceRange, PriceRange, PriceRange, PriceRange, PriceRange, PriceRange];
  originalPlatformRanges?: [PriceRange, PriceRange, PriceRange, PriceRange];
  used: boolean;
  confidence: "medium" | "low";
  gpuReason: string;
  sacrifice: string;
};

const tiers: Tier[] = [
  { budget: 50000, label: "Budget", target: "1080p", resolutions: ["1080p"], fps: "Smooth esports and sensible 1080p medium/high settings; actual FPS varies by title.", cpu: "Used Ryzen 5 5600", gpu: "Used Radeon RX 6600 8GB / RTX 2060", motherboard: "Used A520/B450 AM4 board", ram: "Used 16GB (2x8GB) DDR4-3200", storage: "500GB NVMe SSD", psu: "500W 80+ Bronze", case: "Mesh-front mid-tower", cooler: "Stock cooler", originalPlatformRanges: [[10000, 12000], [18000, 24000], [7000, 10000], [4000, 6000]], ranges: [[0, 0], [0, 0], [0, 0], [0, 0], [4500, 6000], [5000, 7000], [3500, 5000], [0, 0]], used: true, confidence: "medium", gpuReason: "RX 6600-class cards deliver the strongest practical 1080p value when bought tested and with warranty.", sacrifice: "16GB RAM and 500GB storage leave less multitasking and library headroom." },
  { budget: 80000, label: "Value", target: "1440p", resolutions: ["1440p"], fps: "Strong 1440p performance using a tested used GPU; actual FPS varies by title and settings.", cpu: "Used Ryzen 5 5600", gpu: "Used Radeon RX 7900 XT", motherboard: "Used B550 AM4 board", ram: "Used 32GB DDR4-3200/3600", storage: "1TB NVMe SSD", psu: "750W 80+ Gold", case: "High-airflow mid-tower", cooler: "Stock cooler", originalPlatformRanges: [[12000, 16000], [45000, 60000], [8000, 12000], [6000, 9000]], ranges: [[0, 0], [0, 0], [0, 0], [0, 0], [6500, 8500], [6500, 8500], [4500, 6500], [0, 0]], used: true, confidence: "medium", gpuReason: "The used RX 7900 XT receives the largest share of this route because it is the clearest current gaming-performance gain.", sacrifice: "AM4 limits future CPU upgrades and the GPU must be checked carefully for condition and warranty." },
  { budget: 100000, label: "Mid-range", target: "1440p", resolutions: ["1440p"], fps: "High-settings 1440p target; verify the exact game and settings before promising a frame rate.", cpu: "Used Ryzen 7 5700X3D", gpu: "Used RTX 4070 / Radeon RX 7800 XT", motherboard: "Used B550 AM4 board", ram: "Used 32GB (2x16GB) DDR4-3200/3600", storage: "1TB Gen4 NVMe SSD", psu: "750W 80+ Gold", case: "Airflow mid-tower", cooler: "Tower air cooler", originalPlatformRanges: [[24000, 28000], [70000, 85000], [10000, 14000], [8000, 12000]], ranges: [[0, 0], [0, 0], [0, 0], [0, 0], [7000, 9000], [8000, 11000], [5000, 7000], [3000, 5000]], used: true, confidence: "medium", gpuReason: "The 5700X3D and a tested high-VRAM used GPU prioritise 1440p frame-time consistency.", sacrifice: "The next CPU upgrade requires replacing the AM4 board and memory." },
  { budget: 150000, label: "Upper mid-range", target: "1440p high refresh", resolutions: ["1440p"], fps: "High-refresh 1440p target; verify the exact game benchmark before purchase.", cpu: "Ryzen 5 7600", gpu: "Radeon RX 9070 / RTX 5070", motherboard: "B650 AM5 motherboard", ram: "32GB DDR5-6000", storage: "1TB Gen4 NVMe SSD", psu: "750W 80+ Gold", case: "High-airflow mid-tower", cooler: "Tower air cooler", ranges: [[20000, 22000], [70000, 75000], [12000, 14000], [16000, 18000], [6000, 7000], [8000, 9000], [5000, 6000], [3000, 4000]], used: false, confidence: "medium", gpuReason: "New AM5 platform cost is justified here by a current high-refresh GPU and a clearer CPU upgrade path.", sacrifice: "The build stays at 1TB storage and a six-core CPU to protect the GPU budget." },
  { budget: 200000, label: "Enthusiast", target: "4K", resolutions: ["4k"], fps: "4K high settings with upscaling; native 4K performance depends heavily on the title.", cpu: "Ryzen 5 7600", gpu: "RTX 5070", motherboard: "B650 AM5 motherboard", ram: "32GB DDR5-6000", storage: "2TB Gen4 NVMe SSD", psu: "750W 80+ Gold", case: "High-airflow mid-tower", cooler: "Tower air cooler", ranges: [[22000, 26000], [70000, 80000], [9000, 12000], [16000, 18000], [9000, 10000], [9000, 10000], [5000, 6000], [3000, 4000]], used: false, confidence: "medium", gpuReason: "The RTX 5070 keeps this route balanced: enough 4K upscaling headroom without letting the graphics card consume the entire build.", sacrifice: "The six-core CPU and 32GB memory prioritise GPU value and a practical platform." },
  { budget: 275000, label: "High-end", target: "4K high refresh", resolutions: ["4k"], fps: "4K high-refresh target with upscaling and frame generation where supported.", cpu: "Ryzen 7 9800X3D", gpu: "RTX 5070 Ti", motherboard: "X870E AM5 motherboard", ram: "32GB DDR5-6000", storage: "2TB Gen4 NVMe SSD", psu: "850W 80+ Gold", case: "Premium high-airflow case", cooler: "360mm AIO", ranges: [[40000, 42000], [145000, 160000], [18000, 20000], [17000, 18000], [9000, 10000], [11000, 12000], [7000, 7000], [5000, 6000]], used: false, confidence: "medium", gpuReason: "The RTX 5070 Ti gives this route a strong 4K balance while keeping the platform, storage and cooling proportionate.", sacrifice: "64GB memory and flagship GPU pricing are intentionally avoided to keep this below the 5090 tier." },
  { budget: 330000, label: "Flagship", target: "4K high refresh", resolutions: ["4k"], fps: "High-refresh 4K target; verify the exact game, driver and upscaling mode.", cpu: "Ryzen 7 9800X3D", gpu: "RTX 5080", motherboard: "X870E AM5 motherboard", ram: "32GB DDR5-6000", storage: "4TB Gen4 NVMe SSD", psu: "1200W 80+ Gold", case: "Premium full-tower case", cooler: "360mm or 420mm AIO", ranges: [[40000, 43000], [175000, 195000], [20000, 22000], [18000, 20000], [16000, 20000], [12000, 14000], [8000, 10000], [6000, 8000]], used: false, confidence: "medium", gpuReason: "The RTX 5080 is the high-refresh 4K target here; the rest of the system avoids paying flagship-tier prices twice.", sacrifice: "32GB memory is retained while budget goes toward the GPU and 4TB storage." },
  { budget: 450000, label: "Extreme", target: "4K high refresh", resolutions: ["4k"], fps: "4K high refresh with upscaling and frame generation where supported.", cpu: "Ryzen 7 9800X3D", gpu: "Radeon RX 7900 XTX", motherboard: "X870E AM5 motherboard", ram: "32GB DDR5-6000", storage: "4TB Gen4 NVMe SSD", psu: "1000W or 1200W 80+ Gold", case: "Premium full-tower case", cooler: "420mm AIO", ranges: [[42000, 45000], [180000, 200000], [24000, 28000], [20000, 24000], [16000, 20000], [16000, 20000], [12000, 16000], [8000, 10000]], used: false, confidence: "low", gpuReason: "This route uses the Radeon RX 7900 XTX for a distinct high-end 4K configuration without duplicating the RTX 5090 route.", sacrifice: "The extra spend improves capacity and infrastructure more than gaming FPS." },
  { budget: 600000, label: "Ultra enthusiast", target: "4K high refresh", resolutions: ["4k"], fps: "Maximum practical 4K gaming headroom; verify every component price before ordering.", cpu: "Ryzen 7 9800X3D", gpu: "RTX 5090", motherboard: "X870E AM5 motherboard", ram: "64GB DDR5-6000", storage: "4TB Gen4 NVMe SSD", psu: "1600W 80+ Gold", case: "Premium full-tower case", cooler: "420mm AIO", ranges: [[50000, 50000], [430000, 430000], [30000, 30000], [25000, 25000], [20000, 20000], [20000, 20000], [15000, 15000], [10000, 10000]], used: false, confidence: "low", gpuReason: "This is the single RTX 5090 route, with the platform and power delivery sized for the flagship card.", sacrifice: "Value per rupee is intentionally sacrificed for maximum 4K gaming headroom." },
];

function halfRange(range: PriceRange): PriceRange {
  return [Math.round(range[0] / 2), Math.round(range[1] / 2)];
}

function part(category: BuildComponent["category"], name: string, reason: string, range: PriceRange, condition: "new" | "used" | "bundled", sourceIds: string[], priceNote?: string): BuildComponent {
  return { category, name, reason, ...(condition === "bundled" ? {} : { priceRangeINR: range }), condition, sourceIds, priceNote };
}

export function makeBuild(tier: Tier): GamingPCBuild {
  const platformRanges = tier.used && tier.originalPlatformRanges ? tier.originalPlatformRanges.map(halfRange) : tier.ranges.slice(0, 4);
  const ranges: PriceRange[] = [...platformRanges, ...tier.ranges.slice(4)];
  const platformCondition = tier.used ? "used" : "new";
  const platformSources = tier.used ? ["getpc-used", "getpc-price"] : ["md-cpu", "md-gpu", "smartprix"];
  const snapshotBuild = getBuildPricing(String(tier.budget));
  const range: [number, number] = snapshotBuild?.budgetRangeINR ?? [tier.budget - 20000, tier.budget + 20000];
  const components = [
    part("CPU", tier.cpu, "The CPU is matched to the GPU target and platform budget; spending more here would reduce gaming performance elsewhere.", ranges[0], platformCondition, platformSources, tier.used ? "Estimated at 50% of the latest new-equivalent price; verify condition and warranty." : undefined),
    part("GPU", tier.gpu, tier.gpuReason, ranges[1], platformCondition, tier.used ? ["getpc-used", "getpc-price"] : ["md-gpu", "smartprix"], tier.used ? "Estimated at 50% of the latest new-equivalent price; verify exact model and warranty." : "Check stock, exact model and warranty before paying."),
    part("Motherboard", tier.motherboard, "Selected for socket compatibility, required expansion and adequate power delivery for this CPU.", ranges[2], platformCondition, tier.used ? ["getpc-used", "md-b550"] : ["md-am5", "smartprix"]),
    part("RAM", tier.ram, "Dual-channel memory is prioritised; capacity and speed are balanced against current Indian memory pricing.", ranges[3], platformCondition, tier.used ? ["getpc-used", "smartprix"] : ["smartprix"]),
    part("Storage", tier.storage, "A fast SSD keeps the system responsive; capacity is the first place trimmed when GPU prices rise.", ranges[4], "new", ["smartprix"]),
    part("PSU", tier.psu, "A reputable PSU with appropriate headroom is essential system infrastructure, not a place to gamble on used stock.", ranges[5], "new", ["smartprix"]),
    part("Case", tier.case, "Airflow and GPU clearance matter more than glass or RGB at this budget.", ranges[6], "new", ["smartprix"]),
    part("CPU Cooler", tier.cooler, "Cooling is sized to the CPU and noise target; bundled cooling is used where the processor supports it.", ranges[7], ranges[7][1] === 0 ? "bundled" : "new", ranges[7][1] === 0 ? [] : ["smartprix"]),
  ].map((component) => {
    const live = snapshotBuild?.components[component.category];
    if (!live || component.condition !== live.condition) return component;
    return {
      ...component,
      name: live.name,
      priceRangeINR: [live.low, live.high] as PriceRange,
      priceINR: undefined,
      priceNote: `${live.sourceName}: ${live.matchedName}`,
      livePrice: {
        checkedAt: pricingSnapshot.checkedAt,
        sourceName: live.sourceName,
        sourceUrl: live.sourceUrl,
        condition: live.condition,
        originalPriceINR: live.originalPriceINR,
      },
    };
  });
  const cpuName = components.find((component) => component.category === "CPU")?.name ?? tier.cpu;
  const gpuName = components.find((component) => component.category === "GPU")?.name ?? tier.gpu;
  return {
    slug: String(tier.budget), budget: tier.budget, budgetRange: range,
    title: `Best Gaming PC Around ₹${tier.budget.toLocaleString("en-IN")} in India`,
    metaDescription: `${tier.label} Indian gaming PC build for ${tier.target}, targeting ₹${range[0].toLocaleString("en-IN")}–₹${range[1].toLocaleString("en-IN")} with current price checks.`,
    intro: `A ${tier.label.toLowerCase()} build for ${tier.target}, selected to keep the complete parts total within ₹${range[0].toLocaleString("en-IN")}–₹${range[1].toLocaleString("en-IN")}.`,
    summary: `${cpuName} paired with ${gpuName}. Target: ${tier.target}.`, targetResolution: tier.resolutions[0], targetResolutions: tier.resolutions, targetFPS: tier.fps,
    components, performance: { "1080p": { rating: tier.budget < 100000 ? 4 : 5, note: tier.target }, "1440p": { rating: tier.budget < 80000 ? 2 : 4, note: tier.target }, "4k": { rating: tier.budget < 150000 ? 1 : 4, note: tier.target } },
    whyTheseComponents: `${tier.gpuReason} ${tier.sacrifice}`,
    upgradePath: `Priority 1: GPU when the target resolution becomes demanding. Priority 2: RAM or storage if workloads grow. Priority 3: ${tier.used ? "move to a new AM5 platform when a CPU upgrade would otherwise require replacing the board and memory." : "use the AM5 socket's future CPU path after a GPU upgrade."}`,
    upgradeSteps: [{ timeframe: "Now", priority: 1, action: "Buy only after checking the exact listed price, stock and warranty." }, { timeframe: "1–2 years", priority: 2, action: "Upgrade the GPU if the target resolution or settings increases." }, { timeframe: "2–3 years", priority: 3, action: tier.used ? "Consider a full AM5 platform change when the AM4 CPU becomes limiting." : "Upgrade the CPU within AM5 if a game becomes CPU-limited." }],
    alternatives: [{ component: "GPU", alternative: tier.used ? "A newer equivalent with warranty" : "The competing AMD/NVIDIA card at the same price", tradeoff: "Choose based on verified current price, rasterisation, ray tracing and warranty rather than brand alone." }, { component: "CPU", alternative: tier.used ? "A lower AM4 CPU and stronger GPU" : "A lower CPU tier and larger SSD", tradeoff: "Reallocating money changes minimum frames or storage convenience; it does not improve every workload equally." }],
    ifBudgetChanges: `Stay within the ₹${range[0].toLocaleString("en-IN")}–₹${range[1].toLocaleString("en-IN")} target by protecting GPU class first and reducing cosmetic features before PSU quality. ${tier.sacrifice}`,
    faqs: [{ question: "Who should buy this build?", answer: `Buy it if you want ${tier.target} and accept the listed ${tier.used ? "used-market checks" : "new-part pricing volatility"}.` }, { question: "Who should avoid it?", answer: tier.used ? "Avoid it if you require only factory-new parts or cannot test used hardware before purchase." : "Avoid it if current GPU stock pushes the total outside the stated range; wait or step down a route." }, { question: "Are the FPS numbers guaranteed?", answer: "No. This page uses target guidance rather than universal FPS promises. Game-specific performance requires a benchmark for the exact GPU, settings and driver." }],
    relatedBuilds: [], relatedGuides: [{ label: "How to build a gaming PC", href: "/guides/how-to-build-a-gaming-pc" }, { label: "Component compatibility", href: "/guides/pc-component-compatibility" }], lastUpdated: "2026-08-30", pricesChecked: snapshotBuild ? pricingSnapshot.checkedAt : "2026-08-30", sources: marketSources, confidence: tier.confidence, tested: false, audience: [tier.target], useCases: ["Gaming"], sacrifices: [tier.sacrifice], whoShouldBuy: [`Players targeting ${tier.target}`, ...(tier.used ? ["Buyers comfortable with tested used components"] : [])], whoShouldAvoid: [tier.used ? "Buyers who require all-new components" : "Buyers unwilling to verify live stock and price"],
  };
}

export const researchedBuilds = tiers.map(makeBuild).map((build, index, all) => ({
  ...build,
  relatedBuilds: all.filter((_, candidateIndex) => candidateIndex !== index).slice(Math.max(0, index - 1), index + 2).map((candidate) => candidate.slug),
}));
