import type { Metadata } from "next";
import type { FAQItem } from "@/types";

export const SITE_NAME = "Bench Verdict";
export const SITE_URL = "https://www.benchverdict.in";
export const SITE_DESCRIPTION =
  "Independent gaming PC builds, component guides and comparisons for every budget in India.";
export const DEFAULT_LOCALE = "en_IN";

interface PageMetaInput {
  title: string;
  description: string;
  path: string; // e.g. "/gaming-pc/builds/100000"
  ogImage?: string;
  noindex?: boolean;
}

/**
 * Builds a Next.js Metadata object with a consistent title template,
 * canonical URL, Open Graph and Twitter card data. Every route should
 * generate its metadata through this function rather than hand-rolling
 * duplicate metadata logic.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogImage = "/og/default.png",
  noindex = false,
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      type: "website",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export function generateBreadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function generateFAQSchema(faqs: FAQItem[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: absoluteUrl(input.path),
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}

/** Renders one or more JSON-LD schema objects as a script tag. */
export function jsonLd(schema: object | (object | null)[] | null) {
  const items = Array.isArray(schema) ? schema.filter(Boolean) : [schema];
  return {
    __html: JSON.stringify(items.length === 1 ? items[0] : items),
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
