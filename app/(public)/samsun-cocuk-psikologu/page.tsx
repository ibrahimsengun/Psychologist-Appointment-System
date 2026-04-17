import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
    buildLocalBusinessSchema,
    buildFAQSchema,
    buildBreadcrumbSchema,
    buildPersonSchema,
    JsonLd,
    SITE_URL,
    ADDRESS_ATAKUM,
    PERSON_IMAGE,
} from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Samsun Çocuk Psikoloğu | Uzman Psk. Lokman Yılmaz - Atakum',
    description:
        'Samsun ve Atakum\'da çocuk psikoloğu arıyorsanız doğru adrestesiniz. Uzman Psk. Lokman Yılmaz ile oyun terapisi, BDT ve çözüm odaklı yaklaşımlarla çocuğunuza profesyonel psikolojik destek.',
    keywords:
        'samsun çocuk psikoloğu, atakum çocuk psikoloğu, samsun çocuk psikolog, çocuk psikolojik danışman samsun, çocuk terapisi samsun, çocuk psikoloğu atakum, samsun çocuk danışmanlığı',
    alternates: {
        canonical: `${SITE_URL}/samsun-cocuk-psikologu`
    },
    openGraph: {
        title: 'Samsun Çocuk Psikoloğu | Uzman Psk. Lokman Yılmaz',
        description:
            'Samsun Atakum\'da çocuklara yönelik profesyonel psikolojik danışmanlık. Oyun terapisi, BDT ve çözüm odaklı yaklaşımlar.',
        url: `${SITE_URL}/samsun-cocuk-psikologu`,
        siteName: 'Uzman Psk. Lokman Yılmaz',
        locale: 'tr_TR',
        type: 'website'
    }
};

const faqItems = [
    {
        question: 'Çocuk psikoloğuna ne zaman başvurulmalıdır?',
        answer:
            'Çocuğunuzda ani davranış değişiklikleri, uyku sorunları, okul başarısında düşüş, aşırı öfke nöbetleri, yeme bozuklukları, sosyal içe çekilme veya travmatik bir olay sonrası belirtiler gözlemliyorsanız çocuk psikoloğuna başvurmanız önerilir.'
    },
    {
        question: 'Çocuk psikoloğu görüşmeleri nasıl gerçekleşir?',
        answer:
            'Çocuklarla yapılan görüşmelerde yaşa uygun yöntemler kullanılır. Oyun terapisi, resim çalışmaları ve hikâye temelli tekniklerle çocuğun kendini güvenli bir şekilde ifade etmesi sağlanır. İlk görüşmede genellikle ebeveynlerle birlikte değerlendirme yapılır.'
    },
    {
        question: 'Samsun\'da çocuk psikoloğu hizmeti nerede verilmektedir?',
        answer:
            'Uzman Psk. Lokman Yılmaz, Samsun Atakum\'daki Psikodemy ofisinde yüz yüze çocuk danışmanlığı hizmeti sunmaktadır. Ayrıca online görüşme seçeneği de mevcuttur.'
    },
    {
        question: 'Çocuk danışmanlığı kaç seans sürer?',
        answer:
            'Süre, çocuğun ihtiyaçlarına ve sorunun niteliğine bağlı olarak değişir. Genellikle 6-12 seans arasında bir süreç planlanır; ancak bireysel değerlendirme sonucunda bu süre uzayabilir veya kısalabilir.'
    },
    {
        question: 'Çocuk danışmanlığında ebeveynlerin rolü nedir?',
        answer:
            'Ebeveyn katılımı, çocuk danışmanlığının başarısında kritik bir rol oynar. Süreç boyunca ebeveynlerle düzenli görüşmeler yapılır, çocuğun evdeki uyumu için rehberlik sağlanır ve aile dinamikleri değerlendirilir.'
    }
];

const cocukAlanlari = [
    { baslik: 'Kaygı ve Korku', aciklama: 'Ayrılık kaygısı, okul korkusu, sosyal fobi ve genel kaygı bozuklukları' },
    { baslik: 'Davranış Sorunları', aciklama: 'Öfke kontrolü, karşı gelme, uyum güçlükleri ve saldırgan davranışlar' },
    { baslik: 'Dikkat Eksikliği', aciklama: 'Odaklanma güçlüğü, dikkat dağınıklığı ve akademik performans sorunları' },
    { baslik: 'Uyku ve Yeme', aciklama: 'Uyku bozuklukları, kâbus, yeme reddi ve seçici yeme davranışları' },
    { baslik: 'Travma ve Yas', aciklama: 'Kayıp, ayrılık, travmatik yaşantılar ve yas süreçleri' },
    { baslik: 'Sosyal Uyum', aciklama: 'Akran ilişkileri, okula uyum güçlüğü ve sosyal beceri eksiklikleri' },
];

export default function SamsunCocukPsikologuPage() {
    const localBusinessJsonLd = buildLocalBusinessSchema({
        id: 'samsun-cocuk-psikologu',
        name: 'Samsun Çocuk Psikoloğu - Uzman Psk. Lokman Yılmaz',
        description: 'Samsun Atakum\'da çocuklara yönelik profesyonel psikolojik danışmanlık hizmeti',
        url: `${SITE_URL}/samsun-cocuk-psikologu`,
        address: ADDRESS_ATAKUM,
        geo: { latitude: '41.3287', longitude: '36.2921' },
    });

    const faqJsonLd = buildFAQSchema(faqItems);
    const breadcrumbJsonLd = buildBreadcrumbSchema([{ name: 'Samsun Çocuk Psikoloğu', path: '/samsun-cocuk-psikologu' }]);
    const personJsonLd = buildPersonSchema({
        description: 'Samsun Atakum\'da çocuk psikoloğu olarak hizmet veren uzman psikolog',
        url: `${SITE_URL}/samsun-cocuk-psikologu`,
        address: ADDRESS_ATAKUM,
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
                                    <li className="text-foreground font-medium">Samsun Çocuk Psikoloğu</li>
                                </ol>
                            </nav>

                            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                <span className="text-sm font-medium text-primary">Çocuk &amp; Ergen Danışmanlığı</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                <span className="text-foreground">Samsun&apos;da</span>
                                <br />
                                <span className="text-primary">Çocuk Psikoloğu</span>
                            </h1>

                            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Atakum&apos;da Psikodemy ofisimizde çocuğunuza özel, bilimsel temelli psikolojik destek.
                                <span className="text-foreground font-medium"> Oyun terapisi, BDT ve çözüm odaklı yaklaşımlarla</span> çocuğunuzun
                                duygusal gelişimini destekliyoruz.
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
                                        alt="Samsun Çocuk Psikoloğu - Uzman Psk. Lokman Yılmaz"
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

            {/* Çocuk Danışmanlığı Yaklaşımı */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
                            Samsun Çocuk Psikoloğu Hakkında
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Çocuğunuzun Duygusal Sağlığı İçin Uzman Destek
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            <strong className="text-foreground">Uzman Psk. Lokman Yılmaz</strong>, Samsun Atakum&apos;da çocuklara yönelik
                            profesyonel psikolojik danışmanlık hizmeti sunmaktadır. Ondokuz Mayıs Üniversitesi Psikoloji Bölümü mezunu
                            ve <strong className="text-foreground">Oyun Terapisi Uygulayıcı Sertifikası</strong> sahibi olan Yılmaz,
                            çocukların gelişimsel ihtiyaçlarına uygun terapi yöntemleri kullanmaktadır.
                        </p>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Çocuk danışmanlığında <strong className="text-foreground">oyun terapisi</strong>,{' '}
                            <strong className="text-foreground">bilişsel davranışçı terapi (BDT)</strong> ve{' '}
                            <strong className="text-foreground">çözüm odaklı yaklaşım</strong> çerçevesinde çalışılmaktadır.
                            Her çocuğun bireysel ihtiyaçları doğrultusunda kişiye özel bir danışmanlık planı oluşturulmaktadır.
                        </p>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Samsun&apos;da <Link href="/atakum-psikolog" className="text-primary hover:underline font-semibold">Atakum çocuk psikoloğu</Link> arayanlar için güvenli, empatik ve gizliliğe dayalı bir ortamda çocuğunuzla birlikte çalışıyoruz.
                        </p>

                        {/* Neden çocuk psikoloğuna başvurulmalı */}
                        <div className="bg-background rounded-2xl p-8 border border-border/50 mb-8">
                            <h3 className="text-xl font-bold mb-4">Çocuğunuzda Bu Belirtiler Varsa Profesyonel Destek Alın</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                    'Ani davranış değişiklikleri ve öfke nöbetleri',
                                    'Okul başarısında belirgin düşüş',
                                    'Uyku sorunları veya kâbuslar',
                                    'Aşırı kaygı, korku veya endişe',
                                    'Sosyal içe çekilme ve arkadaş edinememe',
                                    'Yeme bozuklukları veya iştahsızlık',
                                    'Tırnak yeme, parmak emme gibi alışkanlıklar',
                                    'Ayrılık kaygısı ve okula gitmek istememe',
                                    'Travmatik olay sonrası tepkiler',
                                    'Alt ıslatma veya diğer gerileme belirtileri',
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                        <span className="text-muted-foreground">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Çalışma Alanları */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
                            Çocuk Danışmanlığı Alanları
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Samsun&apos;da Çocuklara Yönelik Psikolojik Hizmetler
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Atakum Psikodemy&apos;de çocuğunuzun ihtiyaçlarına özel uzman desteği
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {cocukAlanlari.map((alan, index) => (
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

                    <div className="text-center mt-10">
                        <p className="text-muted-foreground mb-4">
                            Tüm psikolojik danışmanlık hizmetlerimizi incelemek için:
                        </p>
                        <Link
                            href="/hizmetler"
                            title="Tüm Psikolojik Danışmanlık Hizmetleri"
                            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline underline-offset-4 transition-all"
                        >
                            Tüm Hizmetleri Gör
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
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
                            Samsun Çocuk Psikoloğu SSS
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
                            Samsun&apos;da Çocuğunuz İçin Profesyonel Destek
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Çocuğunuzun duygusal sağlığı için bugün adım atın. Atakum Psikodemy ofisimizde yüz yüze veya online
                            görüşme için randevu alın.
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
                        <p className="text-sm text-muted-foreground mt-6">
                            <Link href="/atakum-aile-danismani" className="text-primary hover:underline">
                                Atakum Aile Danışmanlığı
                            </Link>{' '}
                            hizmetimizi de incelemenizi öneririz.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
