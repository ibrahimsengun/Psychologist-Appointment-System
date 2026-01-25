import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Kullanım Şartları | Uzm. Psk. Lokman Yılmaz',
    description:
        'Uzm. Psk. Lokman Yılmaz web sitesi kullanım şartları ve koşulları. Siteyi kullanmadan önce lütfen okuyunuz.',
    alternates: {
        canonical: 'https://lokmanyilmaz.com.tr/terms'
    }
};

export default function TermsPage() {
    const lastUpdated = '16 Ocak 2026';

    return (
        <section className="py-16 md:py-24">
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
                        <li className="text-foreground font-medium">Kullanım Şartları</li>
                    </ol>
                </nav>

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Kullanım Şartları</h1>
                    <p className="text-muted-foreground mb-8">
                        Son güncelleme: {lastUpdated}
                    </p>

                    <div className="prose prose-lg max-w-none">
                        {/* Giriş */}
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8">
                            <p className="text-foreground leading-relaxed m-0">
                                Bu kullanım şartları, <strong>Uzm. Psk. Lokman Yılmaz</strong> web sitesini
                                (lokmanyilmaz.com.tr) kullanımınızı düzenlemektedir. Sitemizi kullanarak
                                aşağıdaki şartları kabul etmiş sayılırsınız.
                            </p>
                        </div>

                        {/* Bölümler */}
                        <div className="space-y-8">
                            {/* Hizmet Tanımı */}
                            <div className="bg-background border border-border/50 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        1
                                    </span>
                                    Hizmet Tanımı
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    Bu web sitesi, Uzm. Psk. Lokman Yılmaz tarafından sunulan psikolojik danışmanlık
                                    ve aile danışmanlığı hizmetleri hakkında bilgi vermek, randevu almak ve
                                    iletişim kurmak amacıyla hazırlanmıştır.
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Bireysel psikolojik danışmanlık</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Aile ve çift danışmanlığı</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Çocuk ve ergen danışmanlığı</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Online görüşme hizmetleri</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Site Kullanımı */}
                            <div className="bg-background border border-border/50 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        2
                                    </span>
                                    Site Kullanımı
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    Web sitemizi kullanırken aşağıdaki kurallara uymanız gerekmektedir:
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Siteyi yasalara uygun şekilde kullanmak</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Doğru ve güncel bilgiler vermek</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Sitenin işleyişini engelleyecek faaliyetlerden kaçınmak</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Diğer kullanıcıların haklarına saygı göstermek</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Randevu Politikası */}
                            <div className="bg-background border border-border/50 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        3
                                    </span>
                                    Randevu Politikası
                                </h2>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>
                                            <strong>Randevu Onayı:</strong> Online randevu talepleri, danışman tarafından
                                            onaylandıktan sonra kesinleşir.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>
                                            <strong>İptal:</strong> Randevu iptal veya değişiklik talepleri en az 24 saat
                                            öncesinden bildirilmelidir.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>
                                            <strong>Geç Kalma:</strong> Görüşmelere 10 dakikadan fazla geç kalınması
                                            durumunda seans süresi kısalabilir veya iptal edilebilir.
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Mesleki Gizlilik */}
                            <div className="bg-background border border-border/50 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        4
                                    </span>
                                    Mesleki Gizlilik
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    Psikolojik danışmanlık sürecinde paylaşılan tüm bilgiler mesleki gizlilik
                                    ilkeleri çerçevesinde korunmaktadır. Aşağıdaki durumlar haricinde bilgiler
                                    kesinlikle üçüncü kişilerle paylaşılmaz:
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Danışanın veya başkalarının can güvenliğinin tehlikede olması</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Yasal zorunluluk gerektiren durumlar</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Danışanın yazılı onayının olduğu durumlar</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Sorumluluk Reddi */}
                            <div className="bg-background border border-border/50 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        5
                                    </span>
                                    Sorumluluk Reddi
                                </h2>
                                <div className="space-y-4 text-muted-foreground">
                                    <p>
                                        <strong>Bilgilendirme Amaçlıdır:</strong> Web sitesindeki blog yazıları ve
                                        içerikler genel bilgilendirme amaçlıdır. Profesyonel psikolojik danışmanlık
                                        veya tedavi yerine geçmez.
                                    </p>
                                    <p>
                                        <strong>Acil Durumlar:</strong> Acil ruh sağlığı krizlerinde lütfen 182 ALO
                                        Psikiyatri hattını veya en yakın sağlık kuruluşunu arayın.
                                    </p>
                                    <p>
                                        <strong>Teknik Sorunlar:</strong> Web sitesinin kesintisiz veya hatasız
                                        çalışacağını garanti edemeyiz. Olası teknik sorunlardan kaynaklanan
                                        zararlardan sorumlu tutulamayız.
                                    </p>
                                </div>
                            </div>

                            {/* Fikri Mülkiyet */}
                            <div className="bg-background border border-border/50 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        6
                                    </span>
                                    Fikri Mülkiyet Hakları
                                </h2>
                                <p className="text-muted-foreground">
                                    Bu web sitesindeki tüm içerikler (yazılar, görseller, logolar, tasarım vb.)
                                    Uzm. Psk. Lokman Yılmaz&apos;a aittir ve telif hakları ile korunmaktadır.
                                    İçeriklerin izinsiz kopyalanması, çoğaltılması veya dağıtılması yasaktır.
                                </p>
                            </div>

                            {/* Değişiklikler */}
                            <div className="bg-background border border-border/50 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        7
                                    </span>
                                    Şartlarda Değişiklik
                                </h2>
                                <p className="text-muted-foreground">
                                    Bu kullanım şartlarını herhangi bir zamanda güncelleme hakkını saklı tutarız.
                                    Değişiklikler bu sayfada yayınlandığı anda yürürlüğe girer. Siteyi kullanmaya
                                    devam etmeniz, güncellenmiş şartları kabul ettiğiniz anlamına gelir.
                                </p>
                            </div>

                            {/* İletişim */}
                            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                                        8
                                    </span>
                                    İletişim
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    Kullanım şartlarıyla ilgili sorularınız için bizimle iletişime geçebilirsiniz:
                                </p>
                                <div className="space-y-2 text-foreground">
                                    <p><strong>E-posta:</strong> psk.lokmanylmz@gmail.com</p>
                                    <p><strong>Telefon:</strong> +90 (544) 832 20 91</p>
                                    <p><strong>Adres:</strong> Atakum, Samsun</p>
                                </div>
                            </div>

                            {/* Uygulanacak Hukuk */}
                            <div className="bg-background border border-border/50 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        9
                                    </span>
                                    Uygulanacak Hukuk
                                </h2>
                                <p className="text-muted-foreground">
                                    Bu kullanım şartları Türkiye Cumhuriyeti yasalarına tabidir. Herhangi bir
                                    uyuşmazlık halinde Samsun Mahkemeleri ve İcra Daireleri yetkilidir.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
