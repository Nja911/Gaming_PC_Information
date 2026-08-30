import Link from "next/link";
export interface BudgetTier { label: string; href: string; description: string; }
export default function BudgetCard({ tier, index }: { tier: BudgetTier; index: number }) { return <Link href={tier.href} className="group block border-t border-line py-6"><div className="flex gap-5"><span className="text-sm text-dim">0{index + 1}</span><div><div className="font-display text-3xl group-hover:text-accent sm:text-4xl">{tier.label}</div><p className="mt-2 max-w-md text-sm text-dim">{tier.description}</p></div></div></Link>; }
