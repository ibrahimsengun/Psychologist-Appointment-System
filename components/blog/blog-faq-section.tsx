import type { BlogFaq } from '@/types/blog';

// Yazıya özel sık sorulan sorular. Metin düz yazı olarak basılır; HTML yorumlanmaz.
export function BlogFaqSection({ faqs }: { faqs: BlogFaq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="blog-faq-title" className="mt-12">
      <h2 id="blog-faq-title" className="text-2xl font-bold mb-6">
        Sık Sorulan Sorular
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-background border border-border/50 rounded-xl overflow-hidden"
          >
            <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none hover:bg-muted/50 transition-colors [&::-webkit-details-marker]:hidden">
              <h3 className="font-semibold text-left">{faq.question}</h3>
              <svg
                aria-hidden="true"
                className="w-5 h-5 flex-shrink-0 text-primary transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 text-muted-foreground whitespace-pre-line">{faq.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
