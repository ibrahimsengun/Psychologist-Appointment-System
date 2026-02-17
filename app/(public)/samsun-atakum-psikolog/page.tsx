import { getServices } from '@/actions/service-actions';
import { getHomepageFAQs } from '@/actions/faq-actions';
import { FAQSection } from '@/components/faq-section';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Samsun Atakum Psikolog | Uzm. Psk. Lokman Yılmaz - Aile Danışmanı',
    description:
        'Samsun Atakum\'da uzman psikolog Lokman Yılmaz ile profesyonel psikolojik danışmanlık. Bireysel danışmanlık, çift danışmanlığı, aile danışmanlığı, yüz yüze ve online görüşme hizmetleri.',
    keywords:
        'samsun atakum psikolog, samsun atakum psikolojik danışman, samsun atakum aile danışmanı, samsun atakum psikolog randevu, samsun atakum online psikolog',
    alternates: { canonical: 'https://lokmanyilmaz.com.tr/samsun-atakum-psikolog' },
    openGraph: {
        title: 'Samsun Atakum Psikolog | Uzm. Psk. Lokman Yılmaz',
        description: 'Samsun Atakum\'da uzman psikolog hizmeti. Bireysel, çift ve aile danışmanlığı. Yüz yüze ve online görüşme.',
        url: 'https://lokmanyilmaz.com.tr/samsun-atakum-psikolog',
        siteName: 'Uzman Psk. Lokman Yılmaz',
        locale: 'tr_TR',
        type: 'website'
    }
};



export default async function SamsunAtakumPsikologPage() {
    const [services, faqs] = await Promise.all([getServices(), getHomepageFAQs()]);
    const imgUrl = 'https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/WhatsApp%20Image%202025-12-19%20at%2017.02.36.jpeg';

    const localBusinessJsonLd = {
        '@context': 'https://schema.org', '@type': 'LocalBusiness',
        '@id': 'https://lokmanyilmaz.com.tr/#samsun-atakum-psikolog',
        name: 'Uzm. Psk. Lokman Yılmaz - Samsun Atakum Psikolog',
        description: 'Samsun Atakum\'da uzman psikolog ve aile danışmanlığı hizmetleri',
        url: 'https://lokmanyilmaz.com.tr/samsun-atakum-psikolog',
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
            { '@type': 'ListItem', position: 2, name: 'Samsun Psikolog', item: 'https://lokmanyilmaz.com.tr/samsun-psikolog' },
            { '@type': 'ListItem', position: 3, name: 'Samsun Atakum Psikolog', item: 'https://lokmanyilmaz.com.tr/samsun-atakum-psikolog' }
        ]
    };

    const personJsonLd = {
        '@context': 'https://schema.org', '@type': 'Person',
        name: 'Lokman Yılmaz', jobTitle: 'Uzman Psikolog ve Aile Danışmanı',
        description: 'Samsun Atakum\'da psikolog ve aile danışmanlığı hizmeti veren uzman psikolog',
        image: imgUrl, url: 'https://lokmanyilmaz.com.tr/samsun-atakum-psikolog',
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
                                    <li><Link href="/samsun-psikolog" className="hover:text-primary transition-colors">Samsun Psikolog</Link></li>
                                    <li>/</li>
                                    <li className="text-foreground font-medium">Samsun Atakum Psikolog</li>
                                </ol>
                            </nav>
                            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                <span className="text-sm font-medium text-primary">Samsun Atakum</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                <span className="text-foreground">Samsun Atakum&apos;da</span><br />
                                <span className="text-primary">Uzman Psikolog</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Samsun Atakum&apos;da yüz yüze ve online psikolojik danışmanlık hizmeti.
                                <span className="text-foreground font-medium"> Bireysel, çift ve aile danışmanlığı</span> alanlarında
                                bilimsel temelli yaklaşımla yanınızdayız.
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
                                    <Image src={imgUrl} alt="Samsun Atakum Psikolog - Uzm. Psk. Lokman Yılmaz" width={500} height={600} className="w-full h-auto object-cover" priority />
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
                        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">Samsun Atakum Psikolog</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Uzm. Psk. Lokman Yılmaz</h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Uzm. Psk. Lokman Yılmaz olarak, Ondokuz Mayıs Üniversitesi Psikoloji lisans eğitimini onur derecesiyle,
                            Evlilik ve Aile Danışmanlığı yüksek lisans eğitimini yüksek onur derecesiyle tamamlamıştır. Şu anda
                            Samsun Atakum&apos;da psikolog olarak yüz yüze ve online psikolojik danışmanlık hizmeti vermektedir.
                        </p>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Bireysel, çift ve aile danışmanlığı alanlarında bilimsel temelli ve etik ilkelere bağlı bir anlayışla çalışmaktadır.
                            Danışmanlık sürecini, her danışanın bireysel ihtiyaç ve hedefleri doğrultusunda yapılandırılmış ve kişiye özel
                            bir plan çerçevesinde yürütmektedir.
                        </p>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Eğer siz de Samsun Atakum psikolog arayışındaysanız, yüz yüze ya da online psikolog hizmeti için iletişime geçebilirsiniz.
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
                                <div className="text-2xl font-bold text-primary mb-1">Yüz Yüze</div>
                                <div className="text-sm text-muted-foreground">Samsun Atakum</div>
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
                        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">Samsun Atakum Psikolojik Danışmanlık</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Hizmetlerimiz</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Samsun Atakum&apos;da bilimsel temelli yaklaşımlarla profesyonel psikolojik danışmanlık hizmetleri
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

            {/* Why Choose Section */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">Neden Biz?</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Samsun Atakum&apos;da Psikolog Seçerken</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-background rounded-2xl p-6 border border-border/50 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Bilimsel Temelli Yaklaşım</h3>
                            <p className="text-muted-foreground text-sm">Danışmanlık sürecinde bilimsel temelli ve etik ilkelere bağlı, kanıta dayalı yöntemler kullanılmaktadır.</p>
                        </div>
                        <div className="bg-background rounded-2xl p-6 border border-border/50 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Kişiye Özel Plan</h3>
                            <p className="text-muted-foreground text-sm">Her danışanın bireysel ihtiyaç ve hedefleri doğrultusunda yapılandırılmış, kişiye özel danışmanlık planı.</p>
                        </div>
                        <div className="bg-background rounded-2xl p-6 border border-border/50 text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Yüz Yüze & Online</h3>
                            <p className="text-muted-foreground text-sm">Samsun Atakum ofisimizde yüz yüze veya online görüşme seçenekleriyle esnek danışmanlık imkânı.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FAQSection faqs={faqs} />

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Samsun Atakum&apos;da Profesyonel Psikolojik Danışmanlık</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Psikolojik sağlığınız için bugün adım atın. Samsun Atakum&apos;da yüz yüze veya online psikolog görüşmesi için hemen randevu alın.
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
