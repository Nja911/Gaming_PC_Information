import type { PerformanceRating, Resolution } from "@/types";

const LABELS: Record<PerformanceRating, string> = {
  1: "Not recommended",
  2: "Limited",
  3: "Playable",
  4: "Strong",
  5: "Excellent",
};

function Dots({ rating }: { rating: PerformanceRating }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 — ${LABELS[rating]}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          aria-hidden="true"
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: n <= rating ? "var(--signal)" : "var(--line)" }}
        />
      ))}
    </div>
  );
}

export default function PerformanceCard({
  performance,
}: {
  performance: Record<Resolution, { rating: PerformanceRating; note: string }>;
}) {
  const order: Resolution[] = ["1080p", "1440p", "4k"];
  return (
    <div className="border-y border-line divide-y divide-line-soft bg-panel/50">
      {order.map((res) => (
        <div key={res} className="grid gap-3 p-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-center sm:gap-6">
          <div className="flex items-center justify-between gap-4 sm:justify-start">
            <span className="w-16 font-display text-lg text-paper uppercase">{res}</span>
            <Dots rating={performance[res].rating} />
          </div>
          <p className="min-w-0 text-sm text-dim">{performance[res].note}</p>
        </div>
      ))}
      <p className="px-5 py-3 text-xs text-dim">
        Ratings reflect typical experience across popular titles at reasonable settings. Actual frame rates vary by
        game, settings, drivers and updates — treat these as guidance, not guarantees.
      </p>
    </div>
  );
}
