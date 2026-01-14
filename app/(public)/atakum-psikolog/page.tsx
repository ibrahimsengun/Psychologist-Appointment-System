import { getServices } from '@/actions/service-actions';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Atakum Psikolog | Uzman Psk. Lokman Yılmaz - Aile Danışmanı',
    description:
        'Atakum\'da uzman psikolog ve aile danışmanı Lokman Yılmaz ile profesyonel psikolojik destek alın. Bireysel terapi, çift terapisi, aile danışmanlığı ve online terapi hizmetleri.',
    keywords:
        'atakum psikolog, atakum psikolojik danışman, atakum aile danışmanı, atakum terapi, atakum psikolog randevu, samsun atakum psikolog',
    alternates: {
        canonical: 'https://lokmanyilmaz.com.tr/atakum-psikolog'
    },
    openGraph: {
        title: 'Atakum Psikolog | Uzman Psk. Lokman Yılmaz',
        description:
            'Atakum\'da uzman psikolog hizmeti. Bireysel terapi, aile danışmanlığı ve online terapi.',
        url: 'https://lokmanyilmaz.com.tr/atakum-psikolog',
        siteName: 'Uzman Psk. Lokman Yılmaz',
        locale: 'tr_TR',
        type: 'website'
    }
};

const faqItems = [
    {
        question: 'Atakum\'da psikolog randevusu nasıl alabilirim?',
        answer:
            'Web sitemiz üzerinden online randevu sistemi ile veya telefonla arayarak randevu alabilirsiniz. Psikodemy ofisimiz Atakum\'da merkezi bir konumda yer almaktadır.'
    },
    {
        question: 'Atakum\'da yüz yüze terapi hizmeti veriliyor mu?',
        answer:
            'Evet, Atakum bölgesindeki Psikodemy ofisimizde yüz yüze terapi hizmeti sunuyoruz. Ayrıca online terapi seçeneği de mevcuttur.'
    },
    {
        question: 'İlk psikolojik görüşme nasıl geçer?',
        answer:
            'İlk görüşmede sizinle tanışır, beklentilerinizi ve ihtiyaçlarınızı dinleriz. Güvenli ve yargısız bir ortamda kendinizi rahatça ifade edebilirsiniz. Bu görüşme sonrasında size uygun terapi planı oluşturulur.'
    },
    {
        question: 'Hangi yaş gruplarına hizmet veriliyor?',
        answer:
            'Çocuklar, ergenler ve yetişkinlerle çalışıyoruz. Bireysel terapi, aile danışmanlığı ve çift terapisi hizmetleri sunulmaktadır.'
    }
];

export default async function AtakumPsikologPage() {
    const services = await getServices();

    const localBusinessJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://lokmanyilmaz.com.tr/#atakum-psikolog',
        name: 'Uzman Psk. Lokman Yılmaz - Atakum Psikolog',
        description: 'Atakum\'da uzman psikolog ve aile danışmanlığı hizmetleri',
        url: 'https://lokmanyilmaz.com.tr/atakum-psikolog',
        telephone: '+905448322091',
        email: 'psk.lokmanylmz@gmail.com',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Psikodemy',
            addressLocality: 'Atakum',
            addressRegion: 'Samsun',
            addressCountry: 'TR'
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '41.3287',
            longitude: '36.2921'
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00'
            },
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday'],
                opens: '09:00',
                closes: '14:00'
            }
        ],
        priceRange: '$$',
        image:
            'https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/WhatsApp%20Image%202025-12-19%20at%2017.02.36.jpeg'
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer
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
                name: 'Atakum Psikolog',
                item: 'https://lokmanyilmaz.com.tr/atakum-psikolog'
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
                <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10 py-16">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                        <div className="lg:w-1/2 text-center lg:text-left">
                            {/* Breadcrumb */}
                            <nav className="mb-6" aria-label="Breadcrumb">
                                <ol className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground">
                                    <li>
                                        <Link href="/" className="hover:text-primary transition-colors">
                                            Ana Sayfa
                                        </Link>
                                    </li>
                                    <li>/</li>
                                    <li className="text-foreground font-medium">Atakum Psikolog</li>
                                </ol>
                            </nav>

                            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                <span className="text-sm font-medium text-primary">Samsun Atakum</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                <span className="text-foreground">Atakum&apos;da</span>
                                <br />
                                <span className="text-primary">Uzman Psikolog</span>
                            </h1>

                            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Atakum&apos;da Psikodemy ofisimizde profesyonel psikolojik destek.
                                <span className="text-foreground font-medium"> Yüz yüze ve online</span> terapi
                                seçenekleriyle yanınızdayız.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
                                <Link
                                    href="/appointment"
                                    className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold
                           hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1"
                                >
                                    <span>Randevu Al</span>
                                    <svg
                                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </Link>
                                <a
                                    href="tel:+905448322091"
                                    className="inline-flex items-center justify-center gap-2 bg-background border-2 border-border px-8 py-4 rounded-xl font-semibold
                           hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <span>Hemen Ara</span>
                                </a>
                            </div>

                            {/* Location Badge */}
                            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span>Psikodemy, Atakum / Samsun</span>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="relative max-w-md mx-auto">
                                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl blur-2xl"></div>
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                                    <Image
                                        src="https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/WhatsApp%20Image%202025-12-19%20at%2017.02.36.jpeg"
                                        alt="Atakum Psikolog - Uzman Psk. Lokman Yılmaz"
                                        width={500}
                                        height={600}
                                        className="w-full h-auto object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
                            Atakum Psikolog Hakkında
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Uzm. Psikolog Lokman Yılmaz
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Ondokuz Mayıs Üniversitesi Psikoloji Bölümü&apos;nden onur derecesiyle mezun olan
                            Lokman Yılmaz, aynı üniversitenin Evlilik ve Aile Danışmanlığı Programı&apos;ndan
                            yüksek onur derecesiyle Aile Danışmanı unvanını almıştır.
                        </p>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Atakum&apos;daki Psikodemy ofisinde yüz yüze görüşmeler gerçekleştiren Yılmaz,
                            çocuklar, ergenler ve yetişkinlerle çalışmaktadır.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                            <div className="bg-background rounded-xl p-4 border border-border/50">
                                <div className="text-2xl font-bold text-primary mb-1">OMÜ</div>
                                <div className="text-sm text-muted-foreground">Psikoloji Bölümü</div>
                            </div>
                            <div className="bg-background rounded-xl p-4 border border-border/50">
                                <div className="text-2xl font-bold text-primary mb-1">Y.Lisans</div>
                                <div className="text-sm text-muted-foreground">Aile Danışmanlığı</div>
                            </div>
                            <div className="bg-background rounded-xl p-4 border border-border/50">
                                <div className="text-2xl font-bold text-primary mb-1">BDT</div>
                                <div className="text-sm text-muted-foreground">Sertifikalı</div>
                            </div>
                            <div className="bg-background rounded-xl p-4 border border-border/50">
                                <div className="text-2xl font-bold text-primary mb-1">Atakum</div>
                                <div className="text-sm text-muted-foreground">Yüz Yüze Terapi</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
                            Atakum&apos;da Psikolojik Hizmetler
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Hizmetlerimiz</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Atakum&apos;da bilimsel temelli yaklaşımlarla profesyonel psikolojik destek
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="group bg-background border border-border/50 rounded-2xl p-6 
                         hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                            >
                                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                                    {service.name}
                                </h3>
                                {service.description && (
                                    <p className="text-muted-foreground">{service.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
                            Sık Sorulan Sorular
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Atakum Psikolog Hizmetleri SSS
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqItems.map((item, index) => (
                            <details
                                key={index}
                                className="group bg-background border border-border/50 rounded-xl overflow-hidden"
                            >
                                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                                    <h3 className="font-semibold text-left pr-4">{item.question}</h3>
                                    <svg
                                        className="w-5 h-5 flex-shrink-0 text-primary transition-transform group-open:rotate-180"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </summary>
                                <div className="px-6 pb-6 text-muted-foreground">
                                    <p>{item.answer}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Atakum&apos;da Profesyonel Psikolojik Destek
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Psikolojik sağlığınız için bugün adım atın. Atakum Psikodemy ofisimizde yüz yüze
                            veya online görüşme için randevu alın.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href="/appointment"
                                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold
                         hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25"
                            >
                                Randevu Al
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-background border-2 border-border px-8 py-4 rounded-xl font-semibold
                         hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                            >
                                İletişime Geç
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
