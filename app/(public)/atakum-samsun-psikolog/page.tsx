import { getServices } from '@/actions/service-actions';
import { getHomepageFAQs } from '@/actions/faq-actions';
import { FAQSection } from '@/components/faq-section';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Atakum Samsun Psikolog | Uzm. Psk. Lokman Yılmaz - Aile Danışmanı',
    description:
        'Atakum Samsun\'da uzman psikolog Lokman Yılmaz ile bireysel, çift ve aile danışmanlığı. Yüz yüze ve online psikolojik danışmanlık hizmetleri için randevu alın.',
    keywords:
        'atakum samsun psikolog, atakum samsun psikolojik danışman, atakum samsun aile danışmanı, atakum samsun psikolog randevu, atakum samsun online psikolog',
    alternates: { canonical: 'https://lokmanyilmaz.com.tr/atakum-samsun-psikolog' },
    openGraph: {
        title: 'Atakum Samsun Psikolog | Uzm. Psk. Lokman Yılmaz',
        description: 'Atakum Samsun\'da uzman psikolog hizmeti. Bireysel, çift ve aile danışmanlığı. Yüz yüze ve online görüşme.',
        url: 'https://lokmanyilmaz.com.tr/atakum-samsun-psikolog',
        siteName: 'Uzman Psk. Lokman Yılmaz',
        locale: 'tr_TR',
        type: 'website'
    }
};


export default async function AtakumSamsunPsikologPage() {
    const [services, faqs] = await Promise.all([getServices(), getHomepageFAQs()]);
    const imgUrl = 'https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/WhatsApp%20Image%202025-12-19%20at%2017.02.36.jpeg';

    const localBusinessJsonLd = {
        '@context': 'https://schema.org', '@type': 'LocalBusiness',
        '@id': 'https://lokmanyilmaz.com.tr/#atakum-samsun-psikolog',
        name: 'Uzm. Psk. Lokman Yılmaz - Atakum Samsun Psikolog',
        description: 'Atakum Samsun\'da uzman psikolog ve aile danışmanlığı hizmetleri',
        url: 'https://lokmanyilmaz.com.tr/atakum-samsun-psikolog',
        telephone: '+905448322091', email: 'psk.lokmanylmz@gmail.com',
        address: { '@type': 'PostalAddress', streetAddress: 'Psikodemy', addressLocality: 'Atakum', addressRegion: 'Samsun', addressCountry: 'TR' },
        geo: { '@type': 'GeoCoordinates', latitude: '41.3287', longitude: '36.2921' },
        openingHoursSpecification: [
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '14:00' }
        ],
        priceRange: '$$', image: imgUrl
    };



    const breadcrumbJsonLd = {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://lokmanyilmaz.com.tr' },
            { '@type': 'ListItem', position: 2, name: 'Atakum Psikolog', item: 'https://lokmanyilmaz.com.tr/atakum-psikolog' },
            { '@type': 'ListItem', position: 3, name: 'Atakum Samsun Psikolog', item: 'https://lokmanyilmaz.com.tr/atakum-samsun-psikolog' }
        ]
    };

    const personJsonLd = {
        '@context': 'https://schema.org', '@type': 'Person',
        name: 'Lokman Yılmaz', jobTitle: 'Uzman Psikolog ve Aile Danışmanı',
        description: 'Atakum Samsun\'da psikolog ve aile danışmanlığı hizmeti veren uzman psikolog',
        image: imgUrl, url: 'https://lokmanyilmaz.com.tr/atakum-samsun-psikolog',
        address: { '@type': 'PostalAddress', streetAddress: 'Psikodemy', addressLocality: 'Atakum', addressRegion: 'Samsun', addressCountry: 'TR' },
        telephone: '+905448322091', email: 'psk.lokmanylmz@gmail.com',
        worksFor: { '@type': 'Organization', name: 'Psikodemy' }
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
                <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="container mx-auto px-4 relative z-10 py-16">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <nav className="mb-6" aria-label="Breadcrumb">
                                <ol className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground">
                                    <li><Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link></li>
                                    <li>/</li>
                                    <li><Link href="/atakum-psikolog" className="hover:text-primary transition-colors">Atakum Psikolog</Link></li>
                                    <li>/</li>
                                    <li className="text-foreground font-medium">Atakum Samsun Psikolog</li>
                                </ol>
                            </nav>
                            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                <span className="text-sm font-medium text-primary">Atakum / Samsun</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                <span className="text-foreground">Atakum Samsun</span><br />
                                <span className="text-primary">Psikolog Hizmeti</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Atakum Samsun&apos;da profesyonel psikolojik danışmanlık.
                                <span className="text-foreground font-medium"> Uzm. Psk. Lokman Yılmaz</span> ile bireysel, çift ve
                                aile danışmanlığı hizmeti alın.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
                                <Link href="/appointment" className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1">
                                    <span>Randevu Al</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                                <a href="tel:+905448322091" className="inline-flex items-center justify-center gap-2 bg-background border-2 border-border px-8 py-4 rounded-xl font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>Hemen Ara</span>
                                </a>
                            </div>
                            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Psikodemy, Atakum / Samsun</span>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="relative max-w-md mx-auto">
                                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl blur-2xl" />
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                                    <Image src={imgUrl} alt="Atakum Samsun Psikolog - Uzm. Psk. Lokman Yılmaz" width={500} height={600} className="w-full h-auto object-cover" priority />
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
                        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">Atakum Samsun Psikolog</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Uzm. Psk. Lokman Yılmaz</h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Ondokuz Mayıs Üniversitesi Psikoloji lisans eğitimini onur derecesiyle, Evlilik ve Aile Danışmanlığı
                            yüksek lisans eğitimini yüksek onur derecesiyle tamamlayan Uzm. Psk. Lokman Yılmaz, Atakum Samsun&apos;da
                            psikolojik danışmanlık hizmeti sunmaktadır.
                        </p>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Danışmanlık sürecinde her bireyin kendine özgü ihtiyaçlarını ön planda tutarak, bilimsel temelli ve
                            etik ilkelere bağlı bir yaklaşım benimseyen Yılmaz, yüz yüze ve online psikolojik danışmanlık
                            seçenekleri sunmaktadır.
                        </p>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Siz de Atakum Samsun&apos;da psikolog arayışındaysanız, bireysel, çift veya aile danışmanlığı
                            için randevu alabilirsiniz.
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
                                <div className="text-2xl font-bold text-primary mb-1">Atakum</div>
                                <div className="text-sm text-muted-foreground">Yüz Yüze Görüşme</div>
                            </div>
                            <div className="bg-background rounded-xl p-4 border border-border/50">
                                <div className="text-2xl font-bold text-primary mb-1">Online</div>
                                <div className="text-sm text-muted-foreground">Tüm Türkiye</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">Atakum Samsun Danışmanlık Hizmetleri</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Hizmetlerimiz</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Atakum Samsun&apos;da bilimsel temelli ve etik ilkelere bağlı profesyonel psikolojik danışmanlık
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div key={service.id} className="group bg-background border border-border/50 rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{service.name}</h3>
                                {service.description && <p className="text-muted-foreground">{service.description}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Approach Section */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">Danışmanlık Yaklaşımımız</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Atakum Samsun&apos;da Psikolojik Destek</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-background rounded-2xl p-6 border border-border/50 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Akademik Donanım</h3>
                            <p className="text-muted-foreground text-sm">OMÜ Psikoloji lisans ve Evlilik ve Aile Danışmanlığı yüksek lisans eğitimleri, her ikisi de onur dereceleriyle.</p>
                        </div>
                        <div className="bg-background rounded-2xl p-6 border border-border/50 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Etik ve Güvenli Ortam</h3>
                            <p className="text-muted-foreground text-sm">Yargısız, güvenli bir ortamda etik ilkelere bağlı kalarak danışanların kendilerini rahatça ifade edebildiği bir süreç.</p>
                        </div>
                        <div className="bg-background rounded-2xl p-6 border border-border/50 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Bireysel, Çift & Aile</h3>
                            <p className="text-muted-foreground text-sm">Bireysel danışmanlık, çift danışmanlığı ve aile danışmanlığı ile geniş kapsamlı psikolojik destek.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FAQSection faqs={faqs} />

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Atakum Samsun&apos;da Psikolojik Danışmanlık</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Profesyonel psikolojik destek için ilk adımı atın. Atakum Samsun&apos;da yüz yüze veya online psikolog görüşmesi için randevu alın.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/appointment" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25">
                                Randevu Al
                            </Link>
                            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-background border-2 border-border px-8 py-4 rounded-xl font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                                İletişime Geç
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
