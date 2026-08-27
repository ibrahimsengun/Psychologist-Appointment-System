import { QuestionForm } from '@/components/question-form';
import { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircleQuestion, ArrowRight, Shield, Bell } from 'lucide-react';
import { buildBreadcrumbSchema, JsonLd, SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Soru Sorun | Uzman Psk. Lokman Yılmaz',
  description:
    'Psikoloji, terapi ve danışmanlık süreçleri hakkında merak ettiklerinizi anonim olarak sorun. Uzman Psikolog Lokman Yılmaz sorularınızı yanıtlıyor.',
  keywords: 'soru sor, online psikolog soru cevap, psikoloji soruları, samsun psikolog',
  alternates: {
    canonical: `${SITE_URL}/soru-sor`
  },
  openGraph: {
    title: 'Soru Sorun | Uzman Psk. Lokman Yılmaz',
    description: 'Psikoloji hakkında merak ettiklerinizi anonim olarak sorun.',
    url: `${SITE_URL}/soru-sor`,
    siteName: 'Uzman Psk. Lokman Yılmaz',
    locale: 'tr_TR',
    type: 'website'
  }
};

export default function SoruSorPage() {
  const breadcrumbJsonLd = buildBreadcrumbSchema([{ name: 'Soru Sor', path: '/soru-sor' }]);

  return (
    <>
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
                <li className="text-foreground font-medium">Soru Sor</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <MessageCircleQuestion className="w-4 h-4" />
                Sorun
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Soru Sorun</h1>
              <p className="text-lg text-muted-foreground">
                Merak ettiğiniz konuları anonim olarak sorabilirsiniz. Sorularınız gizlidir ve
                sadece cevaplandığında sizinle paylaşılır.
              </p>
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6 mb-12">
              <div className="bg-background border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Gizli & Anonim</h3>
                <p className="text-muted-foreground text-sm">
                  Sorularınız tamamen gizlidir. İsteğe bağlı olarak isminizi paylaşabilirsiniz.
                </p>
              </div>
              <div className="bg-background border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Cevap Bildirimi</h3>
                <p className="text-muted-foreground text-sm">
                  E-posta adresinizi bırakırsanız cevap geldiğinde bilgilendirilirsiniz. Takip
                  kodunuzla da kontrol edebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-background border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Sorunuzu Yazın</h2>
                <QuestionForm />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Hemen cevap almak ister misiniz?
              </h2>
              <p className="text-muted-foreground mb-8">
                Merak ettiğiniz konuları görüşmek veya randevu almak için iletişime geçebilirsiniz.
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
