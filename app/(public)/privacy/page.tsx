import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Gizlilik Politikası | Uzm. Psk. Lokman Yılmaz',
    description:
        'Uzm. Psk. Lokman Yılmaz web sitesi gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, işlendiği ve korunduğu hakkında bilgi.',
    alternates: {
        canonical: 'https://lokmanyilmaz.com.tr/privacy'
    }
};

export default function PrivacyPage() {
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
                        <li className="text-foreground font-medium">Gizlilik Politikası</li>
                    </ol>
                </nav>

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Gizlilik Politikası</h1>
                    <p className="text-muted-foreground mb-8">
                        Son güncelleme: {lastUpdated}
                    </p>

                    <div className="prose prose-lg max-w-none">
                        {/* Giriş */}
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8">
                            <p className="text-foreground leading-relaxed m-0">
                                Bu gizlilik politikası, <strong>Uzm. Psk. Lokman Yılmaz</strong> web sitesini
                                (lokmanyilmaz.com.tr) ziyaret ettiğinizde kişisel verilerinizin nasıl toplandığı,
                                kullanıldığı ve korunduğu hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
                                6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu
                                olarak hareket etmekteyiz.
                            </p>
                        </div>

                        {/* Bölümler */}
                        <div className="space-y-8">
                            {/* Toplanan Veriler */}
                            <div className="bg-background border border-border/50 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        1
                                    </span>
                                    Toplanan Kişisel Veriler
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    Web sitemizi kullanırken aşağıdaki kişisel verileriniz toplanabilir:
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><strong>Kimlik Bilgileri:</strong> Ad, soyad</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><strong>Randevu Bilgileri:</strong> Tercih edilen tarih, saat ve hizmet türü</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><strong>İletişim Formu Mesajları:</strong> Bize ilettiğiniz mesaj içerikleri</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><strong>Kullanım Verileri:</strong> Çerezler aracılığıyla toplanan anonim site kullanım istatistikleri</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Verilerin Kullanımı */}
                            <div className="bg-background border border-border/50 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        2
                                    </span>
                                    Kişisel Verilerin İşlenme Amaçları
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Randevu taleplerinin alınması ve yönetilmesi</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>İletişim formundan gelen mesajların yanıtlanması</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Psikolojik danışmanlık hizmetlerinin sunulması</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Randevu hatırlatmaları ve bilgilendirmelerin yapılması</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Web sitesi performansının iyileştirilmesi</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Yasal yükümlülüklerin yerine getirilmesi</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Çerezler */}
                            <div className="bg-background border border-border/50 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        3
                                    </span>
                                    Çerezler ve Analitik Araçları
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    Web sitemiz, kullanıcı deneyimini iyileştirmek ve site performansını analiz
                                    etmek amacıyla çerezler ve analitik araçlar kullanmaktadır:
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><strong>Microsoft Clarity:</strong> Kullanıcı oturum kayıtları ve ısı haritaları</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><strong>Zorunlu Çerezler:</strong> Sitenin temel işlevlerini sağlayan çerezler</span>
                                    </li>
                                </ul>
                                <p className="text-muted-foreground mt-4">
                                    Çerezleri tarayıcı ayarlarınızdan kontrol edebilir veya devre dışı bırakabilirsiniz.
                                </p>
                            </div>

                            {/* Veri Güvenliği */}
                            <div className="bg-background border border-border/50 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        4
                                    </span>
                                    Veri Güvenliği
                                </h2>
                                <p className="text-muted-foreground">
                                    Kişisel verilerinizin güvenliği bizim için önemlidir. Verilerinizi yetkisiz erişim,
                                    kayıp veya değişikliğe karşı korumak için uygun teknik ve idari tedbirler
                                    almaktayız. SSL şifreleme teknolojisi kullanılmakta ve verileriniz güvenli
                                    sunucularda saklanmaktadır.
                                </p>
                            </div>

                            {/* Veri Paylaşımı */}
                            <div className="bg-background border border-border/50 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        5
                                    </span>
                                    Kişisel Verilerin Aktarımı
                                </h2>
                                <p className="text-muted-foreground">
                                    Kişisel verileriniz, yasal zorunluluklar dışında üçüncü kişilerle paylaşılmamaktadır.
                                    Psikolojik danışmanlık süreçlerinde elde edilen tüm bilgiler mesleki gizlilik
                                    ilkeleri çerçevesinde korunmaktadır.
                                </p>
                            </div>

                            {/* KVKK Hakları */}
                            <div className="bg-background border border-border/50 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        6
                                    </span>
                                    KVKK Kapsamındaki Haklarınız
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aşağıdaki haklara sahipsiniz:
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Kişisel verilerinizin işlenip işlenmediğini öğrenme</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Kişisel verilerinizin düzeltilmesini veya silinmesini isteme</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</span>
                                    </li>
                                </ul>
                            </div>

                            {/* İletişim */}
                            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                                        7
                                    </span>
                                    İletişim
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    Gizlilik politikamız veya kişisel verileriniz hakkında sorularınız için
                                    bizimle iletişime geçebilirsiniz:
                                </p>
                                <div className="space-y-2 text-foreground">
                                    <p><strong>Veri Sorumlusu:</strong> Uzm. Psk. Lokman Yılmaz</p>
                                    <p><strong>E-posta:</strong> psk.lokmanylmz@gmail.com</p>
                                    <p><strong>Telefon:</strong> +90 (544) 832 20 91</p>
                                    <p><strong>Adres:</strong> Atakum, Samsun</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
