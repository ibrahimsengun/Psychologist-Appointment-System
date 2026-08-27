import { getPublicQuestions } from '@/actions/question-actions';
import { Metadata } from 'next';
import Link from 'next/link';
import { MessagesSquare, ArrowRight, User } from 'lucide-react';
import { buildFAQSchema, buildBreadcrumbSchema, JsonLd, SITE_URL } from '@/lib/schema';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export const metadata: Metadata = {
    title: 'Soru & Cevap | Uzman Psk. Lokman Yılmaz',
    description:
        'Psikoloji, terapi ve danışmanlık süreçleri hakkında sıkça sorulan sorular ve uzman psikolog cevapları. Online psikolog soru cevap.',
    keywords:
        'psikolog soru cevap, psikoloji soruları ve cevapları, online psikolog soru cevap, samsun psikolog soru cevap',
    alternates: {
        canonical: `${SITE_URL}/soru-cevap`
    },
    openGraph: {
        title: 'Soru & Cevap | Uzman Psk. Lokman Yılmaz',
        description: 'Psikoloji hakkında sık sorulan sorular ve uzman psikolog cevapları.',
        url: `${SITE_URL}/soru-cevap`,
        siteName: 'Uzman Psk. Lokman Yılmaz',
        locale: 'tr_TR',
        type: 'website'
    }
};

export default async function SoruCevapPage() {
    const questions = await getPublicQuestions();

    const faqJsonLd = buildFAQSchema(
        questions.map((q) => ({
            question: q.question_text,
            answer: q.answer_text || ''
        }))
    );
    const breadcrumbJsonLd = buildBreadcrumbSchema([{ name: 'Soru & Cevap', path: '/soru-cevap' }]);

    return (
        <>
            <JsonLd data={faqJsonLd} />
            <JsonLd data={breadcrumbJsonLd} />

            <main className="min-h-[70vh]">
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
                                <li className="text-foreground font-medium">Soru & Cevap</li>
                            </ol>
                        </nav>

                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                                <MessagesSquare className="w-4 h-4" />
                                Soru & Cevap
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Soru & Cevap
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Sık sorulan sorular ve uzman psikolog cevapları
                            </p>
                        </div>
                    </div>
                </section>

                {/* Questions List */}
                <section className="py-8 md:py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            {questions.length === 0 ? (
                                <div className="text-center py-8 bg-muted/30 rounded-2xl">
                                    <MessagesSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground">
                                        Henüz yayınlanmış soru bulunmamaktadır.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {questions.map((q, index) => (
                                        <article
                                            key={q.id}
                                            className="bg-background border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-start gap-4 mb-4">
                                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                                                    {index + 1}
                                                </span>
                                                <h2 className="font-semibold text-lg leading-tight">
                                                    {q.question_text}
                                                </h2>
                                            </div>

                                            <div className="pl-12">
                                                <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-wrap">
                                                    {q.answer_text}
                                                </p>

                                                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border/50">
                                                    <div className="flex items-center gap-1.5">
                                                        <User className="w-3.5 h-3.5" />
                                                        <span>{q.name || 'Anonim'}</span>
                                                    </div>
                                                    {q.answered_at && (
                                                        <span>
                                                            {format(new Date(q.answered_at), 'd MMMM yyyy', { locale: tr })}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-8 md:py-12 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Sizin de merak ettiğiniz bir konu mu var?
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Anonim olarak sorunuzu gönderebilir, uzman psikolog cevabını bekleyebilirsiniz.
                            </p>
                            <Link
                                href="/soru-sor"
                                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                            >
                                Siz de Soru Sorun
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
