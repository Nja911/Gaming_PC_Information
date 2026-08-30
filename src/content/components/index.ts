import type { ComponentCategory } from "@/types";
import { gpu } from "./gpu";
import { cpu } from "./cpu";

// Fully written category pages. Add a new file + import here to publish
// another category page without touching route code.
export const componentCategories: ComponentCategory[] = [cpu, gpu];

export function getComponentBySlug(slug: string): ComponentCategory | undefined {
  return componentCategories.find((c) => c.slug === slug);
}

export function getAllComponentSlugs(): string[] {
  return componentCategories.map((c) => c.slug);
}

// Categories the site's information architecture reserves URLs for, but
// whose full guide content hasn't been written yet. Listed on the hub page
// as a roadmap so the internal-linking structure is visible to users and
// crawlers even before each page is published (and does not create thin,
// indexable pages in the meantime).
export const plannedComponentCategories: { slug: string; name: string }[] = [
  { slug: "motherboard", name: "Motherboard" },
  { slug: "ram", name: "RAM" },
  { slug: "ssd", name: "SSD & Storage" },
  { slug: "psu", name: "Power Supply (PSU)" },
  { slug: "case", name: "PC Case" },
  { slug: "cpu-cooler", name: "CPU Cooler" },
];
