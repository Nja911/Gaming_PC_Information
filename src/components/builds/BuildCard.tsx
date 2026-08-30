import Link from "next/link";
import type { GamingPCBuild } from "@/types";
import { formatINR } from "@/lib/seo";

export default function BuildCard({ build }: { build: GamingPCBuild }) {
  const gpu = build.components.find((c) => c.category === "GPU");

  return (
    <Link href={`/gaming-pc/builds/${build.slug}`} className="group block border-t border-line py-6 transition-colors hover:border-accent">
      <div className="grid gap-3 sm:grid-cols-[6rem_minmax(0,1fr)_8rem] sm:items-start sm:gap-6">
        <span className="pt-1 text-sm uppercase text-dim">{build.targetResolution}</span>
        <div className="min-w-0">
          <h2 className="font-display text-3xl leading-[.95] transition-colors group-hover:text-accent">
            {build.title.replace("Best Gaming PC Under ", "")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-dim">{gpu?.name}</p>
        </div>
        <span className="readout whitespace-nowrap text-left text-xl text-accent sm:pt-1 sm:text-right">
          {formatINR(build.budget)} <span className="text-sm" aria-hidden="true">↗</span>
        </span>
      </div>
    </Link>
  );
}
