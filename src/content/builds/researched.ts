import type { BuildComponent, GamingPCBuild, Source } from "@/types";

export const marketSources: Source[] = [
  { id: "md-cpu", name: "MDComputers CPU catalogue", type: "retailer", url: "https://mdcomputers.in/catalog/processor", accessedAt: "2026-08-30", supports: "Indian CPU retail prices and availability" },
  { id: "md-gpu", name: "MDComputers GPU catalogue", type: "retailer", url: "https://mdcomputers.in/catalog/graphics-card", accessedAt: "2026-08-30", supports: "Indian GPU retail prices and availability" },
  { id: "md-b550", name: "MDComputers B550 catalogue", type: "retailer", url: "https://mdcomputers.in/catalog/b550-motherboard", accessedAt: "2026-08-30", supports: "B550 retail pricing" },
  { id: "md-am5", name: "MDComputers AMD catalogue", type: "retailer", url: "https://mdcomputers.in/catalog/amd", accessedAt: "2026-08-30", supports: "AM5 CPU and platform retail pricing" },
  { id: "smartprix", name: "Smartprix component index", type: "retailer", url: "https://www.smartprix.com/computer_components/?cat=all", accessedAt: "2026-08-30", supports: "Cross-retailer Indian component price checks" },
  { id: "getpc-price", name: "GetPC India price catalogue", type: "retailer", url: "https://getpc.co.in/parts/cpu/ryzen-5-5600", accessedAt: "2026-08-30", supports: "Indian CPU and paired-component price checks" },
  { id: "getpc-used", name: "GetPC used-parts guide", type: "used-market", url: "https://getpc.co.in/guides/buying-used-parts-india", accessedAt: "2026-08-30", supports: "Used-part depreciation ranges and inspection guidance" },
  { id: "amd-specs", name: "AMD processor specifications", type: "manufacturer", url: "https://www.amd.com/en/products/processors/desktops/ryzen.html", accessedAt: "2026-08-30", supports: "Socket, core and platform specifications" },
  { id: "nvidia-specs", name: "NVIDIA GeForce specifications", type: "manufacturer", url: "https://www.nvidia.com/en-in/geforce/graphics-cards/", accessedAt: "2026-08-30", supports: "GPU memory and feature specifications" },
];

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
  ranges: [[number, number], [number, number], [number, number], [number, number], [number, number], [number, number], [number, number], [number, number]];
  used: boolean;
  confidence: "medium" | "low";
  gpuReason: string;
  sacrifice: string;
};

const tiers: Tier[] = [
  { budget: 40000, label: "Entry-level", target: "1080p esports", resolutions: ["1080p"], fps: "High-refresh esports target; no universal FPS claim without a game-specific benchmark.", cpu: "Used Ryzen 5 3600 / Ryzen 5 5500", gpu: "Used Radeon RX 580 8GB / GTX 1660 Super", motherboard: "Used A320/B450 AM4 board", ram: "16GB (2x8GB) DDR4", storage: "500GB NVMe SSD", psu: "550W 80+ Bronze", case: "Airflow mid-tower", cooler: "Bundled or basic tower", ranges: [[5500, 8000], [9000, 13000], [3500, 5500], [3000, 4500], [4500, 6000], [3500, 5000], [3000, 4500], [0, 1500]], used: true, confidence: "low", gpuReason: "The used GPU market is the only realistic way to fit a discrete card at this budget; verify artifact-free output and fan health.", sacrifice: "Storage capacity, newest upscaling features and platform longevity are sacrificed for a discrete 1080p GPU." },
  { budget: 50000, label: "Budget", target: "1080p", resolutions: ["1080p"], fps: "Smooth esports and sensible 1080p medium/high settings; actual FPS varies by title.", cpu: "Used Ryzen 5 5600", gpu: "Used Radeon RX 6600 8GB / RTX 2060", motherboard: "Used A520/B450 AM4 board", ram: "16GB (2x8GB) DDR4-3200", storage: "500GB NVMe SSD", psu: "500W 80+ Bronze", case: "Mesh-front mid-tower", cooler: "Stock cooler", ranges: [[7000, 9000], [14000, 19000], [4500, 6500], [2500, 3500], [4500, 6000], [3500, 5000], [3000, 4500], [0, 0]], used: true, confidence: "medium", gpuReason: "RX 6600-class cards deliver the strongest practical 1080p value in this price band when bought tested and with warranty.", sacrifice: "16GB RAM and 500GB storage leave less multitasking and library headroom." },
  { budget: 60000, label: "Value", target: "1080p high", resolutions: ["1080p"], fps: "High-refresh 1080p target in esports; high settings in many AAA games, title dependent.", cpu: "Used Ryzen 5 5600", gpu: "Used Radeon RX 7600 / RTX 3060 12GB", motherboard: "Used B550 AM4 board", ram: "16GB (2x8GB) DDR4-3200", storage: "1TB NVMe SSD", psu: "550W 80+ Bronze", case: "Mesh-front mid-tower", cooler: "Stock cooler", ranges: [[7000, 9000], [20000, 26000], [5000, 7500], [3000, 4500], [5500, 7500], [4000, 5500], [3000, 4500], [0, 0]], used: true, confidence: "medium", gpuReason: "The larger used GPU step is more visible in games than spending the same money on a newer CPU platform.", sacrifice: "AM4 has no forward CPU socket path beyond its mature upgrade options." },
  { budget: 75000, label: "Sweet spot", target: "1080p / 1440p", resolutions: ["1080p", "1440p"], fps: "High-refresh 1080p and entry 1440p; settings and game engine determine the result.", cpu: "Used Ryzen 5 5600", gpu: "Used RTX 4060 / Radeon RX 6700 XT", motherboard: "Used B550 AM4 board", ram: "16GB (2x8GB) DDR4-3600", storage: "1TB NVMe SSD", psu: "550W 80+ Bronze", case: "Mesh-front mid-tower", cooler: "Stock cooler", ranges: [[7000, 9000], [22000, 30000], [5000, 7500], [3000, 4500], [5500, 7500], [4000, 5500], [3000, 4500], [0, 0]], used: true, confidence: "medium", gpuReason: "An RTX 4060/RX 6700 XT-class used card makes 1440p viable without paying AM5 platform overhead.", sacrifice: "Used availability and condition are less predictable than a new equivalent." },
  { budget: 100000, label: "Mid-range", target: "1440p", resolutions: ["1440p"], fps: "High-settings 1440p target; do not interpret this as a guaranteed FPS number across games.", cpu: "Used Ryzen 7 5700X3D", gpu: "Used RTX 4070 / Radeon RX 7800 XT", motherboard: "Used B550 AM4 board", ram: "32GB (2x16GB) DDR4-3200/3600", storage: "1TB Gen4 NVMe SSD", psu: "650W 80+ Bronze", case: "Airflow mid-tower", cooler: "Tower air cooler", ranges: [[12000, 16000], [40000, 52000], [6500, 9500], [5000, 7500], [5500, 7500], [6500, 8500], [4000, 5500], [2500, 4000]], used: true, confidence: "medium", gpuReason: "The 5700X3D and a used 12GB/16GB GPU combination prioritise 1440p frame-time consistency while keeping DDR5 out of the budget.", sacrifice: "The next CPU upgrade requires a new motherboard and DDR5 platform." },
  { budget: 125000, label: "Upper mid-range", target: "1440p high refresh", resolutions: ["1440p"], fps: "High-refresh 1440p target; verify the specific game benchmark before promising a frame rate.", cpu: "Ryzen 5 7600", gpu: "Radeon RX 9070 / RTX 5070", motherboard: "B650 AM5 motherboard", ram: "32GB DDR5-6000", storage: "1TB Gen4 NVMe SSD", psu: "750W 80+ Gold", case: "High-airflow mid-tower", cooler: "Tower air cooler", ranges: [[19000, 23000], [78000, 100000], [14000, 17000], [22000, 30000], [6500, 9000], [7500, 10000], [5000, 7000], [3000, 5000]], used: false, confidence: "medium", gpuReason: "This is the first tier where new AM5 platform cost is justified by a current high-refresh GPU rather than saved for the next upgrade.", sacrifice: "The build stays at 1TB storage and a six-core CPU to protect the GPU budget." },
  { budget: 150000, label: "High-end", target: "1440p / 4K", resolutions: ["1440p", "4k"], fps: "High-refresh 1440p and playable 4K with upscaling; game-specific testing is still required.", cpu: "Ryzen 7 9800X3D", gpu: "Radeon RX 9070 XT / RTX 5070 Ti", motherboard: "B650/X870 AM5 motherboard", ram: "32GB DDR5-6000", storage: "1TB Gen4 NVMe SSD", psu: "850W 80+ Gold", case: "High-airflow mid-tower", cooler: "240mm AIO or premium air cooler", ranges: [[48000, 55000], [90000, 155000], [15000, 25000], [22000, 30000], [6500, 10000], [9000, 13000], [5000, 8000], [5000, 9000]], used: false, confidence: "medium", gpuReason: "Current listings put 16GB-class cards such as the RX 9070 XT well below some RTX 5070 Ti models, so the choice should follow rasterisation versus ray-tracing priorities.", sacrifice: "GPU availability can force a choice between the nominal budget and a lower-tier card." },
  { budget: 200000, label: "Enthusiast", target: "4K", resolutions: ["4k"], fps: "4K high settings with upscaling; native 4K FPS depends heavily on the individual title.", cpu: "Ryzen 7 9800X3D", gpu: "RTX 5080 16GB / Radeon RX 9070 XT", motherboard: "X870/B650E AM5 motherboard", ram: "64GB DDR5-6000", storage: "2TB Gen4 NVMe SSD", psu: "850W 80+ Gold", case: "Premium airflow case", cooler: "360mm AIO or premium air", ranges: [[48000, 55000], [140000, 205000], [22000, 35000], [40000, 60000], [12000, 18000], [10000, 15000], [8000, 14000], [7000, 12000]], used: false, confidence: "low", gpuReason: "At 4K, the GPU dominates the budget; 16GB-class cards are the minimum sensible starting point, with faster cards selected only when current prices justify them.", sacrifice: "Price volatility may require reducing RAM or storage before reducing the GPU target." },
  { budget: 250000, label: "High-end enthusiast", target: "4K high refresh", resolutions: ["4k"], fps: "4K high-refresh target with upscaling and frame generation where supported; verify per game.", cpu: "Ryzen 7 9800X3D", gpu: "RTX 5090 32GB / RTX 5080 16GB", motherboard: "X870E AM5 motherboard", ram: "64GB DDR5-6000", storage: "2TB Gen4 NVMe SSD", psu: "1000W 80+ Gold", case: "Premium high-airflow case", cooler: "360mm AIO", ranges: [[48000, 55000], [200000, 320000], [30000, 50000], [40000, 60000], [12000, 18000], [14000, 20000], [10000, 18000], [8000, 14000]], used: false, confidence: "low", gpuReason: "This tier exists for users who prioritise 4K headroom and high refresh over value; flagship GPU availability must be checked before purchase.", sacrifice: "Value per rupee is intentionally sacrificed for peak 4K performance and platform headroom." },
];

function part(category: BuildComponent["category"], name: string, reason: string, range: [number, number], condition: "new" | "used" | "bundled", sourceIds: string[], priceNote?: string): BuildComponent {
  return { category, name, reason, ...(condition === "bundled" ? {} : { priceRangeINR: range }), condition, sourceIds, priceNote };
}

export function makeBuild(tier: Tier): GamingPCBuild {
  const used = tier.used ? "used" : "new";
  const src = tier.used ? ["getpc-used", "getpc-price"] : ["md-cpu", "md-gpu", "smartprix"];
  const components = [
    part("CPU", tier.cpu, "The CPU is matched to the GPU target and platform budget; spending more here would reduce gaming performance elsewhere.", tier.ranges[0], used, src),
    part("GPU", tier.gpu, tier.gpuReason, tier.ranges[1], used, tier.used ? ["getpc-used", "getpc-price"] : ["md-gpu", "smartprix"], "Check stock, exact model and warranty before paying."),
    part("Motherboard", tier.motherboard, "Selected for socket compatibility, required expansion and adequate power delivery for this CPU.", tier.ranges[2], used, tier.used ? ["getpc-used", "md-b550"] : ["md-am5", "smartprix"]),
    part("RAM", tier.ram, "Dual-channel memory is prioritised; capacity and speed are balanced against current Indian memory pricing.", tier.ranges[3], used, tier.used ? ["getpc-used", "smartprix"] : ["smartprix"]),
    part("Storage", tier.storage, "A fast SSD keeps the system responsive; capacity is the first place trimmed when GPU prices rise.", tier.ranges[4], "new", ["smartprix"]),
    part("PSU", tier.psu, "A reputable PSU with appropriate headroom is treated as essential system infrastructure, not a place to gamble on used stock.", tier.ranges[5], "new", ["smartprix"]),
    part("Case", tier.case, "Airflow and GPU clearance matter more than glass or RGB at this budget.", tier.ranges[6], "new", ["smartprix"]),
    part("CPU Cooler", tier.cooler, "Cooling is sized to the CPU and noise target; bundled cooling is used where the processor supports it.", tier.ranges[7], tier.ranges[7][1] === 0 ? "bundled" : "new", tier.ranges[7][1] === 0 ? [] : ["smartprix"]),
  ];
  return {
    slug: String(tier.budget), budget: tier.budget, budgetRange: [tier.budget - 5000, tier.budget],
    title: `Best Gaming PC Under ₹${tier.budget.toLocaleString("en-IN")} in India`,
    metaDescription: `${tier.label} Indian gaming PC build for ${tier.target}, based on current retailer and used-market price checks.`,
    intro: `A ${tier.label.toLowerCase()} build for ${tier.target}, researched against current Indian prices and clearly labelled for new versus used parts.`,
    summary: `${tier.cpu} paired with ${tier.gpu}. Target: ${tier.target}.`, targetResolution: tier.resolutions[0], targetResolutions: tier.resolutions, targetFPS: tier.fps,
    components, performance: { "1080p": { rating: tier.budget < 75000 ? 4 : 5, note: tier.target }, "1440p": { rating: tier.budget < 75000 ? 2 : 4, note: tier.target }, "4k": { rating: tier.budget < 150000 ? 1 : 4, note: tier.target } },
    whyTheseComponents: `${tier.gpuReason} ${tier.sacrifice}`,
    upgradePath: `Priority 1: GPU when the target resolution becomes demanding. Priority 2: RAM or storage if workloads grow. Priority 3: ${tier.used ? "move to a new AM5 platform when a CPU upgrade would otherwise require replacing the board and memory." : "use the AM5 socket's future CPU path after a GPU upgrade."}`,
    upgradeSteps: [{ timeframe: "Now", priority: 1, action: "Buy only after checking the exact listed price, stock and warranty." }, { timeframe: "1–2 years", priority: 2, action: "Upgrade the GPU if the target resolution or settings increases." }, { timeframe: "2–3 years", priority: 3, action: tier.used ? "Consider a full AM5 platform change when the AM4 CPU becomes limiting." : "Upgrade the CPU within AM5 if a game becomes CPU-limited." }],
    alternatives: [{ component: "GPU", alternative: tier.used ? "A newer equivalent with warranty" : "The competing AMD/NVIDIA card at the same price", tradeoff: "Choose based on verified current price, rasterisation, ray tracing and warranty rather than brand alone." }, { component: "CPU", alternative: tier.used ? "A lower AM4 CPU and stronger GPU" : "A lower CPU tier and larger SSD", tradeoff: "Reallocating money changes minimum frames or storage convenience; it does not improve every workload equally." }],
    ifBudgetChanges: `If prices move outside this range, preserve the GPU class first and reduce cosmetic features before reducing PSU quality. ${tier.sacrifice}`,
    faqs: [{ question: "Who should buy this build?", answer: `Buy it if you want ${tier.target} and accept the listed ${tier.used ? "used-market checks" : "new-part pricing volatility"}.` }, { question: "Who should avoid it?", answer: tier.used ? "Avoid it if you require only factory-new parts or cannot test used hardware before purchase." : "Avoid it if current GPU stock pushes the total far above the stated range; wait or step down a tier." }, { question: "Are the FPS numbers guaranteed?", answer: "No. This page intentionally uses target guidance rather than unsourced universal FPS promises. Game-specific performance requires a benchmark for the exact GPU, settings and driver." }],
    relatedBuilds: [], relatedGuides: [{ label: "How to build a gaming PC", href: "/guides/how-to-build-a-gaming-pc" }, { label: "Component compatibility", href: "/guides/pc-component-compatibility" }], lastUpdated: "2026-08-30", pricesChecked: "2026-08-30", sources: marketSources, confidence: tier.confidence, tested: false, audience: [tier.target], useCases: ["Gaming"], sacrifices: [tier.sacrifice], whoShouldBuy: [`Players targeting ${tier.target}`, ...(tier.used ? ["Buyers comfortable with tested used components"] : [])], whoShouldAvoid: [tier.used ? "Buyers who require all-new components" : "Buyers unwilling to verify live stock and price"],
  };
}

export const researchedBuilds = tiers.map(makeBuild).map((build, index, all) => ({
  ...build,
  relatedBuilds: all.filter((_, candidateIndex) => candidateIndex !== index).slice(Math.max(0, index - 1), index + 2).map((candidate) => candidate.slug),
}));
