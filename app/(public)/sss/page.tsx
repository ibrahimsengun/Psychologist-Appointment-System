import { getActiveFAQs } from '@/actions/faq-actions';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircleQuestion, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Sıkça Sorulan Sorular | Uzman Psk. Lokman Yılmaz',
    description:
        'Psikolojik danışmanlık hizmeti hakkında sıkça sorulan sorular ve cevapları. Samsun Atakum psikolog randevusu, seans süreleri, online terapi ve daha fazlası.',
    keywords:
        'samsun psikolog sss, atakum psikolog sorular, psikolojik danışmanlık sorular, online terapi sss',
    alternates: {
        canonical: 'https://lokmanyilmaz.com.tr/sss'
    },
    openGraph: {
        title: 'Sıkça Sorulan Sorular | Uzman Psk. Lokman Yılmaz',
        description: 'Psikolojik danışmanlık hizmeti hakkında sıkça sorulan sorular ve cevapları.',
        url: 'https://lokmanyilmaz.com.tr/sss',
        siteName: 'Uzman Psk. Lokman Yılmaz',
        locale: 'tr_TR',
        type: 'website'
    }
};

export default async function SSSPage() {
    const faqs = await getActiveFAQs();

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

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Ana Sayfa',
                item: 'https://lokmanyilmaz.com.tr'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Sıkça Sorulan Sorular',
                item: 'https://lokmanyilmaz.com.tr/sss'
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <main>
                {/* Hero Section */}
                <section className="py-8 md:py-12 bg-gradient-to-b from-primary/5 to-background">
                    <div className="container mx-auto px-4">
                        {/* Breadcrumb */}
                        <nav className="mb-8" aria-label="Breadcrumb">
                            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                                <li>
                                    <Link href="/" className="hover:text-primary transition-colors">
                                        Ana Sayfa
                                    </Link>
                                </li>
                                <li>/</li>
                                <li className="text-foreground font-medium">Sıkça Sorulan Sorular</li>
                            </ol>
                        </nav>

                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                                <MessageCircleQuestion className="w-4 h-4" />
                                SSS
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Sıkça Sorulan Sorular
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Psikolojik danışmanlık süreciyle ilgili merak ettiklerinizin
                                cevaplarını burada bulabilirsiniz. Burada cevabını bulamadığınız
                                sorularınız için iletişime geçebilirsiniz.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQ List */}
                <section className="py-8 md:py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            {faqs.length === 0 ? (
                                <div className="text-center py-8 bg-muted/30 rounded-2xl">
                                    <MessageCircleQuestion className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground">
                                        Henüz soru eklenmemiş.
                                    </p>
                                </div>
                            ) : (
                                <Accordion type="single" collapsible className="w-full space-y-4">
                                    {faqs.map((faq, index) => (
                                        <AccordionItem
                                            key={faq.id}
                                            value={faq.id}
                                            className="bg-background border border-border/50 rounded-2xl px-6 shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-md data-[state=open]:border-primary/20"
                                        >
                                            <AccordionTrigger className="text-left hover:no-underline py-5 gap-4">
                                                <div className="flex items-start gap-4">
                                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                                                        {index + 1}
                                                    </span>
                                                    <span className="font-semibold text-base">{faq.question}</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground pb-6 pl-12">
                                                <p className="leading-relaxed">{faq.answer}</p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            )}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-8 md:py-12 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Başka sorunuz mu var?
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Merak ettiğiniz konuları görüşmek veya randevu almak için
                                iletişime geçebilirsiniz.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link
                                    href="/appointment"
                                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                                >
                                    Randevu Al
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 bg-background border-2 border-border px-8 py-4 rounded-xl font-semibold hover:border-primary/50 hover:bg-muted/50 transition-all"
                                >
                                    İletişime Geç
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
