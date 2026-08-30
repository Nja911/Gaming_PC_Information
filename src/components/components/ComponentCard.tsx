import Link from "next/link";
import type { ComponentCategory } from "@/types";
export default function ComponentCard({ category }: { category: ComponentCategory }) { return <Link href={`/components/${category.slug}`} className="group block border-t border-line py-6"><span className="text-xs uppercase tracking-[.15em] text-accent">{category.shortName}</span><h2 className="mt-2 font-display text-3xl group-hover:text-accent">{category.name}</h2><p className="mt-2 max-w-xl text-sm text-dim">{category.intro}</p></Link>; }
export function PlannedComponentCard({ name }: { name: string }) { return <div className="border-t border-line py-6 text-dim"><span className="text-xs uppercase tracking-[.15em]">Coming soon</span><h2 className="mt-2 font-display text-3xl">{name}</h2></div>; }
