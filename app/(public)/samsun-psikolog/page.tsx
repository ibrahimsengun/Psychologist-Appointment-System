import { getServices } from '@/actions/service-actions';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TrackedLink } from '@/components/tracked-link';
import { TrackedAnchor } from '@/components/tracked-anchor';
import {
    buildLocalBusinessSchema,
    buildFAQSchema,
    buildBreadcrumbSchema,
    buildPersonSchema,
    JsonLd,
    SITE_URL,
    ADDRESS_SAMSUN,
    PERSON_IMAGE,
} from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Samsun Psikolog | Uzman Psk. Lokman Yılmaz - Psikolojik Danışmanlık',
    description:
        'Samsun\'da psikolog arıyorsanız doğru adrestesiniz. Uzman Psk. Lokman Yılmaz ile Samsun Atakum\'da bireysel danışmanlık, aile danışmanlığı, çocuk psikoloğu ve online psikolojik danışmanlık hizmetleri.',
    keywords:
        'samsun psikolog, samsun psikolojik danışman, samsun psikolog tavsiye, samsun psikolog randevu, psikolog samsun, samsun uzman psikolog, samsun psikolog fiyatları, samsun online psikolog',
    alternates: {
        canonical: `${SITE_URL}/samsun-psikolog`
    },
    openGraph: {
        title: 'Samsun Psikolog | Uzman Psk. Lokman Yılmaz',
        description:
            'Samsun\'da uzman psikolog hizmeti. Bireysel danışmanlık, aile danışmanlığı, çocuk psikoloğu ve online görüşme.',
        url: `${SITE_URL}/samsun-psikolog`,
        siteName: 'Uzman Psk. Lokman Yılmaz',
        locale: 'tr_TR',
        type: 'website'
    }
};

const faqItems = [
    {
        question: 'Samsun\'da psikolog randevusu nasıl alabilirim?',
        answer:
            'Web sitemiz üzerinden online randevu sistemi ile veya +90 (544) 832 20 91 numaralı telefondan arayarak randevu alabilirsiniz. Psikodemy ofisimiz Samsun Atakum\'da merkezi bir konumda yer almaktadır.'
    },
    {
        question: 'Samsun\'da hangi bölgelere hizmet veriliyor?',
        answer:
            'Samsun Atakum\'daki Psikodemy ofisimizde yüz yüze görüşmeler gerçekleştiriyoruz. Atakum, İlkadım, Canik, Bafra ve tüm Samsun ilçelerinden gelen danışanlarla çalışıyoruz. Ayrıca online görüşme ile Türkiye\'nin her yerinden hizmet sunuyoruz.'
    },
    {
        question: 'Samsun\'da psikolog ücretleri ne kadar?',
        answer:
            'Psikolojik danışmanlık ücretleri, görüşme türü (yüz yüze veya online), danışmanlık alanı ve seans süresine göre değişiklik gösterebilir. Güncel ücret bilgisi için bizimle iletişime geçebilirsiniz.'
    },
    {
        question: 'Online psikolojik danışmanlık hizmeti sunuluyor mu?',
        answer:
            'Evet, Samsun dışından veya yurt dışından da danışanlarla online görüşme hizmeti sunuyoruz. Güvenli görüntülü görüşme platformları üzerinden profesyonel psikolojik destek alabilirsiniz.'
    },
    {
        question: 'Samsun\'da hangi psikolojik danışmanlık hizmetleri veriliyor?',
        answer:
            'Bireysel danışmanlık, çift ve aile danışmanlığı, çocuk ve ergen danışmanlığı, kaygı ve stres yönetimi, depresyon, OKB, bilimsel hipnoz, travma danışmanlığı ve daha birçok alanda profesyonel destek sunuyoruz.'
    },
    {
        question: 'İlk psikolojik görüşme nasıl gerçekleşir?',
        answer:
            'İlk görüşmede sizinle tanışır, beklentilerinizi ve ihtiyaçlarınızı dinleriz. Güvenli ve yargısız bir ortamda kendinizi rahatça ifade edebilirsiniz. Bu görüşme sonrasında size uygun danışmanlık planı oluşturulur.'
    }
];

const uzmanlikAlanlari = [
    { baslik: 'Bireysel Danışmanlık', aciklama: 'Kişisel sorunlar, kaygı, depresyon, özsaygı ve yaşam krizleriyle başa çıkma' },
    { baslik: 'Aile Danışmanlığı', aciklama: 'Aile içi iletişim sorunları, çatışma çözümü ve sağlıklı aile dinamikleri' },
    { baslik: 'Çift Terapisi', aciklama: 'İlişki sorunları, güven problemleri, bağlanma ve duygusal yakınlık' },
    { baslik: 'Çocuk ve Ergen', aciklama: 'Davranış sorunları, okul uyumu, dikkat eksikliği ve gelişimsel destek' },
    { baslik: 'Kaygı ve Stres', aciklama: 'Anksiyete bozuklukları, panik atak, fobiler ve stres yönetimi' },
    { baslik: 'Online Danışmanlık', aciklama: 'Türkiye ve dünya genelinden güvenli görüntülü psikolojik destek' },
];

export default async function SamsunPsikologPage() {
    const services = await getServices();

    const localBusinessJsonLd = buildLocalBusinessSchema({
        id: 'samsun-psikolog',
        name: 'Samsun Psikolog - Uzman Psk. Lokman Yılmaz',
        description: 'Samsun\'da uzman psikolog ve psikolojik danışmanlık hizmetleri. Bireysel, aile ve çocuk danışmanlığı.',
        url: `${SITE_URL}/samsun-psikolog`,
        address: ADDRESS_SAMSUN,
        geo: { latitude: '41.3287', longitude: '36.2921' },
    });

    const faqJsonLd = buildFAQSchema(faqItems);
    const breadcrumbJsonLd = buildBreadcrumbSchema([{ name: 'Samsun Psikolog', path: '/samsun-psikolog' }]);
    const personJsonLd = buildPersonSchema({
        description: 'Samsun\'da psikolog ve aile danışmanlığı hizmeti veren uzman psikolog',
        url: `${SITE_URL}/samsun-psikolog`,
        address: ADDRESS_SAMSUN,
    });

    return (
        <>
            <JsonLd data={localBusinessJsonLd} />
            <JsonLd data={faqJsonLd} />
            <JsonLd data={breadcrumbJsonLd} />
            <JsonLd data={personJsonLd} />

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
                                    <li className="text-foreground font-medium">Samsun Psikolog</li>
                                </ol>
                            </nav>

                            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                <span className="text-sm font-medium text-primary">Samsun | Atakum | Online</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                <span className="text-foreground">Samsun&apos;da</span>
                                <br />
                                <span className="text-primary">Uzman Psikolog</span>
                            </h1>

                            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Samsun&apos;da profesyonel psikolojik destek arıyorsanız doğru yerdesiniz.
                                Atakum&apos;daki Psikodemy ofisimizde
                                <span className="text-foreground font-medium"> yüz yüze ve online</span> danışmanlık
                                hizmetiyle yanınızdayız.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
                                <TrackedLink
                                    href="/appointment"
                                    title="Samsun Psikolog Randevu Al"
                                    event="click_appointment"
                                    eventSource="landing_hero"
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
                                </TrackedLink>
                                <TrackedAnchor
                                    href="tel:+905448322091"
                                    title="Samsun Psikolog Telefon"
                                    event="click_phone"
                                    eventSource="landing_hero"
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
                                </TrackedAnchor>
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
                                        src={PERSON_IMAGE}
                                        alt="Samsun Psikolog - Uzman Psk. Lokman Yılmaz"
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
                    <div className="max-w-4xl mx-auto">
                        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
                            Samsun Psikolog Hakkında
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Uzm. Psikolog Lokman Yılmaz
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            <strong className="text-foreground">Uzman Psk. Lokman Yılmaz</strong>, Ondokuz Mayıs Üniversitesi
                            Psikoloji Bölümü&apos;nden onur derecesiyle mezun olmuş, aynı üniversitenin{' '}
                            <strong className="text-foreground">Evlilik ve Aile Danışmanlığı</strong> yüksek lisans programını
                            yüksek onur derecesiyle tamamlamıştır.
                        </p>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Samsun&apos;da psikolog olarak Atakum&apos;daki Psikodemy ofisinde yüz yüze görüşmeler gerçekleştiren Yılmaz,
                            aynı zamanda online psikolojik danışmanlık hizmetiyle Türkiye&apos;nin her yerinden danışanlarla
                            çalışmaktadır. Danışmanlık sürecinde{' '}
                            <strong className="text-foreground">psikodinamik yaklaşım</strong>,{' '}
                            <strong className="text-foreground">bilişsel davranışçı terapi (BDT)</strong> ve{' '}
                            <strong className="text-foreground">çözüm odaklı yaklaşım</strong> çerçevesinde çalışmaktadır.
                        </p>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Samsun&apos;da psikolog arayanlar için bireysel danışmanlık, çift ve aile danışmanlığı,
                            çocuk ve ergen danışmanlığı, kaygı yönetimi, depresyon, travma ve daha birçok alanda
                            bilimsel temelli psikolojik destek sunmaktadır.
                        </p>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Eğer siz de Samsun&apos;da psikolog arıyorsanız,{' '}
                            <Link href="/atakum-psikolog" className="text-primary hover:underline font-semibold">
                                Atakum psikolog
                            </Link>{' '}
                            ofisimizde yüz yüze veya online olarak danışmanlık alabilirsiniz.{' '}
                            <Link href="/samsun-cocuk-psikologu" className="text-primary hover:underline font-semibold">
                                Çocuk psikoloğu
                            </Link>{' '}
                            ve{' '}
                            <Link href="/atakum-aile-danismani" className="text-primary hover:underline font-semibold">
                                aile danışmanlığı
                            </Link>{' '}
                            hizmetlerimiz de mevcuttur.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-background rounded-xl p-4 border border-border/50 text-center">
                                <div className="text-2xl font-bold text-primary mb-1">OMÜ</div>
                                <div className="text-sm text-muted-foreground">Psikoloji Bölümü</div>
                            </div>
                            <div className="bg-background rounded-xl p-4 border border-border/50 text-center">
                                <div className="text-2xl font-bold text-primary mb-1">Y.Lisans</div>
                                <div className="text-sm text-muted-foreground">Aile Danışmanlığı</div>
                            </div>
                            <div className="bg-background rounded-xl p-4 border border-border/50 text-center">
                                <div className="text-2xl font-bold text-primary mb-1">BDT</div>
                                <div className="text-sm text-muted-foreground">Sertifikalı</div>
                            </div>
                            <div className="bg-background rounded-xl p-4 border border-border/50 text-center">
                                <div className="text-2xl font-bold text-primary mb-1">Samsun</div>
                                <div className="text-sm text-muted-foreground">Yüz Yüze & Online</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Uzmanlık Alanları */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
                            Samsun Psikolojik Danışmanlık Hizmetleri
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Samsun&apos;da Sunduğumuz Psikolojik Hizmetler
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Bilimsel temelli yaklaşımlarla Samsun&apos;da profesyonel psikolojik destek
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {uzmanlikAlanlari.map((alan, index) => (
                            <div
                                key={index}
                                className="group bg-background border border-border/50 rounded-2xl p-6
                                hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                            >
                                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                                    {alan.baslik}
                                </h3>
                                <p className="text-muted-foreground">{alan.aciklama}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tüm Hizmetler */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
                            Detaylı Hizmet Listesi
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Samsun Psikolog Hizmetlerimiz
                        </h2>
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

                    <div className="text-center mt-10">
                        <Link
                            href="/hizmetler"
                            title="Tüm Psikolojik Danışmanlık Hizmetleri"
                            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline underline-offset-4 transition-all"
                        >
                            Tüm Hizmetleri Detaylı Gör
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Neden Bizi Tercih Etmelisiniz */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
                                Samsun&apos;da Güvenilir Psikolog
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Neden Bizi Tercih Etmelisiniz?
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    baslik: 'Akademik Yetkinlik',
                                    aciklama: 'OMÜ Psikoloji lisans ve Evlilik & Aile Danışmanlığı yüksek lisans derecesi ile güçlü akademik altyapı.'
                                },
                                {
                                    baslik: 'Bilimsel Temelli Yaklaşım',
                                    aciklama: 'Psikodinamik, BDT ve çözüm odaklı yaklaşımları bütünleştiren kanıta dayalı çalışma yöntemi.'
                                },
                                {
                                    baslik: 'Gizlilik ve Güven',
                                    aciklama: 'Tüm görüşmeler etik ilkeler çerçevesinde, tam gizlilik garantisi ile gerçekleştirilir.'
                                },
                                {
                                    baslik: 'Esnek Randevu Seçenekleri',
                                    aciklama: 'Yüz yüze ve online görüşme seçenekleriyle Samsun\'dan ve Türkiye\'nin her yerinden erişilebilir hizmet.'
                                },
                            ].map((item, index) => (
                                <div key={index} className="flex gap-4 p-6 bg-background border border-border/50 rounded-2xl">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">{item.baslik}</h3>
                                        <p className="text-muted-foreground">{item.aciklama}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                            Samsun Psikolog Hizmetleri SSS
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
                            Samsun&apos;da Profesyonel Psikolojik Destek
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Psikolojik sağlığınız için bugün adım atın. Samsun Atakum&apos;daki Psikodemy ofisimizde yüz yüze
                            veya online görüşme için randevu alın.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <TrackedLink
                                href="/appointment"
                                title="Samsun Psikolog Randevu"
                                event="click_appointment"
                                eventSource="landing_cta"
                                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold
                         hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25"
                            >
                                Randevu Al
                            </TrackedLink>
                            <TrackedLink
                                href="/contact"
                                title="İletişime Geç"
                                event="click_contact"
                                eventSource="landing_cta"
                                className="inline-flex items-center justify-center gap-2 bg-background border-2 border-border px-8 py-4 rounded-xl font-semibold
                         hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                            >
                                İletişime Geç
                            </TrackedLink>
                        </div>
                        <p className="text-sm text-muted-foreground mt-6">
                            <Link href="/atakum-psikolog" className="text-primary hover:underline">
                                Atakum Psikolog
                            </Link>{' '}
                            ·{' '}
                            <Link href="/samsun-cocuk-psikologu" className="text-primary hover:underline">
                                Samsun Çocuk Psikoloğu
                            </Link>{' '}
                            ·{' '}
                            <Link href="/atakum-aile-danismani" className="text-primary hover:underline">
                                Atakum Aile Danışmanı
                            </Link>{' '}
                            hizmetlerimizi de incelemenizi öneririz.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
