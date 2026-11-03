import { FAQ } from '@/types/faq';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';

interface FAQSectionProps {
    faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
    if (faqs.length === 0) {
        return null;
    }

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };

    return (
        <section id="sss" className="bg-muted/60 py-16 md:py-24 scroll-mt-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <div className="container">
                <SectionHeading
                    index="07"
                    label="Sıkça Sorulan Sorular"
                    title="Merak edilenler"
                    intro="Psikolojik danışmanlık süreciyle ilgili en çok sorulan soruların cevapları."
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-start-4 lg:col-span-9">
                        <Accordion type="single" collapsible defaultValue={faqs[0]?.id} className="w-full border-t border-foreground/15">
                            {faqs.map((faq) => (
                                <AccordionItem key={faq.id} value={faq.id} className="border-b border-foreground/15">
                                    <AccordionTrigger className="text-left hover:no-underline py-6 gap-6">
                                        <span className="font-heading text-xl md:text-2xl leading-snug">{faq.question}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 max-w-2xl">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        <div className="mt-8">
                            <Link href="/sss" className="link-underline">
                                Tüm sorular <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
