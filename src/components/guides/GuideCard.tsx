import Link from "next/link";
import type { Guide } from "@/types";
export default function GuideCard({ guide }: { guide: Guide }) { return <Link href={`/guides/${guide.slug}`} className="group block border-t border-line py-6"><div className="flex gap-5"><span className="text-sm text-dim">{guide.cluster}</span><div><h2 className="font-display text-2xl group-hover:text-accent sm:text-3xl">{guide.title}</h2><p className="mt-2 text-sm text-dim">{guide.intro}</p></div></div></Link>; }
