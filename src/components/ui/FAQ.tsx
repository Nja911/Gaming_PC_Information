import type { FAQItem } from "@/types";
import { generateFAQSchema, jsonLd } from "@/lib/seo";

export default function FAQ({ items, title = "Common questions" }: { items: FAQItem[]; title?: string }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="faq-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(generateFAQSchema(items))} />
      <h2 id="faq-heading" className="font-display text-2xl font-medium text-paper mb-6">
        {title}
      </h2>
      <dl className="divide-y divide-line border-y border-line">
        {items.map((item) => (
          <div key={item.question} className="py-6 sm:py-8">
            <dt className="font-display mb-2 text-xl font-medium text-paper sm:text-2xl">{item.question}</dt>
            <dd className="text-dim leading-relaxed">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
