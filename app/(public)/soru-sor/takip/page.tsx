import { Suspense } from 'react';
import { QuestionTracking } from '@/components/question-tracking';
import { Metadata } from 'next';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { buildBreadcrumbSchema, JsonLd, SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Soru Takip | Uzman Psk. Lokman Yılmaz',
  description: 'Takip kodunuzu girerek sorduğunuz sorunuzun cevabını kontrol edin.',
  keywords: 'soru takip, psikolog soru cevap takip, samsun psikolog',
  alternates: {
    canonical: `${SITE_URL}/soru-sor/takip`
  },
  openGraph: {
    title: 'Soru Takip | Uzman Psk. Lokman Yılmaz',
    description: 'Takip kodunuzu girerek sorunuzun cevabını kontrol edin.',
    url: `${SITE_URL}/soru-sor/takip`,
    siteName: 'Uzman Psk. Lokman Yılmaz',
    locale: 'tr_TR',
    type: 'website'
  }
};

export default function TakipPage() {
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: 'Soru Sor', path: '/soru-sor' },
    { name: 'Soru Takip', path: '/soru-sor/takip' }
  ]);

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
                <li>
                  <Link href="/soru-sor" className="hover:text-primary transition-colors">
                    Soru Sor
                  </Link>
                </li>
                <li>/</li>
                <li className="text-foreground font-medium">Soru Takip</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Search className="w-4 h-4" />
                Soru Takip
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Sorunuzu Takip Edin</h1>
              <p className="text-lg text-muted-foreground">
                Takip kodunuzu girerek sorunuzun cevabını kontrol edebilirsiniz.
              </p>
            </div>
          </div>
        </section>

        {/* Tracking Section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <Suspense
              fallback={
                <div className="text-center py-12 text-muted-foreground">Yükleniyor...</div>
              }
            >
              <QuestionTracking />
            </Suspense>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Yeni bir soru sormak ister misiniz?
              </h2>
              <p className="text-muted-foreground mb-8">
                Merak ettiğiniz konuları anonim olarak sorabilirsiniz.
              </p>
              <Link
                href="/soru-sor"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
              >
                Soru Sor
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
