import { FAQ } from '@/types/faq';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

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
        <section id="sss" className="py-16 md:py-24 bg-muted/30">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Sıkça Sorulan Sorular
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Psikolojik danışmanlık süreciyle ilgili merak ettiğiniz soruların
                        cevaplarını burada bulabilirsiniz.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible defaultValue={faqs[0]?.id} className="w-full space-y-3">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={faq.id}
                                value={faq.id}
                                className="bg-background border border-border/50 rounded-xl px-6 data-[state=open]:bg-muted/30"
                            >
                                <AccordionTrigger className="text-left hover:no-underline py-5">
                                    <span className="font-semibold pr-4">{faq.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pb-5">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="text-center mt-8">
                        <Link
                            href="/sss"
                            className="text-primary hover:underline font-medium"
                        >
                            Tüm soruları görüntüle →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
