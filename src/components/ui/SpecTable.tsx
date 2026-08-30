import type { BuildComponent, Source } from "@/types";
import { formatINR } from "@/lib/seo";

export default function SpecTable({ components, sources = [] }: { components: BuildComponent[]; sources?: Source[] }) {
  const total = components.reduce(
    (range, c) => {
      if (c.priceRangeINR) return [range[0] + c.priceRangeINR[0], range[1] + c.priceRangeINR[1]] as [number, number];
      const price = c.priceINR ?? 0;
      return [range[0] + price, range[1] + price] as [number, number];
    },
    [0, 0] as [number, number],
  );

  const formatPrice = (c: BuildComponent) => {
    if (c.condition === "bundled" && !c.priceRangeINR && !c.priceINR) return "Bundled";
    if (c.priceRangeINR) return `${formatINR(c.priceRangeINR[0])}–${formatINR(c.priceRangeINR[1])}`;
    return c.priceINR ? formatINR(c.priceINR) : "Bundled";
  };

  return (
    <div className="table-scroll">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <caption className="sr-only">Component list and estimated pricing for this build</caption>
        <colgroup>
          <col className="w-36" />
          <col />
          <col className="w-44" />
        </colgroup>
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-[.14em] text-dim">
            <th scope="col" className="py-3 pr-6 font-medium">Component</th>
            <th scope="col" className="py-3 pr-6 font-medium">Pick</th>
            <th scope="col" className="py-3 font-medium text-right">Est. price</th>
          </tr>
        </thead>
        <tbody>
          {components.map((c) => (
            <tr key={c.category} className="border-b border-line-soft align-top">
              <th scope="row" className="py-4 pr-6 font-medium text-dim whitespace-nowrap">{c.category}</th>
              <td className="min-w-0 py-4 pr-6">
                <div className="text-paper font-medium">{c.name}</div>
                {c.condition && c.condition !== "bundled" && (
                  <span className="mt-2 inline-block text-[.65rem] uppercase tracking-[.14em] text-accent">{c.condition}</span>
                )}
                <div className="text-sm text-dim mt-1 max-w-md">{c.reason}</div>
                {c.priceNote && <div className="text-xs text-dim mt-2 max-w-md">{c.priceNote}</div>}
                {c.sourceIds && sources.length > 0 && (
                  <div className="mt-2 text-xs text-dim">
                    {c.sourceIds.map((id) => sources.find((source) => source.id === id)).filter(Boolean).map((source) => (
                      <a key={source!.id} href={source!.url} target="_blank" rel="noreferrer" className="mr-3 underline editorial-link">
                        {source!.name}
                      </a>
                    ))}
                  </div>
                )}
              </td>
              <td className="py-4 text-right align-top readout text-paper whitespace-nowrap">
                {formatPrice(c)}
              </td>
            </tr>
          ))}
        </tbody>
        {total[1] > 0 && (
          <tfoot>
            <tr>
              <td colSpan={2} className="pt-4 pr-6 text-sm text-dim">
                Estimated total (parts priced above)
              </td>
              <td className="pt-4 text-right readout text-lg text-copper font-medium whitespace-nowrap">
                {formatINR(total[0])}–{formatINR(total[1])}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
      <p className="text-xs text-dim mt-3">
        Prices are approximate estimates for illustration and vary by retailer, region and availability — always check current pricing before buying.
      </p>
    </div>
  );
}
