import Link from 'next/link';
import { Home, ArrowLeft, Search, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Arka Plan Gradientleri */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Sayısı */}
          <div className="relative mb-8">
            <span className="text-[180px] md:text-[220px] font-bold text-primary/10 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 backdrop-blur-sm">
                <Search className="w-10 h-10 text-primary" />
              </div>
            </div>
          </div>

          {/* Başlık */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sayfa Bulunamadı
          </h1>

          {/* Açıklama */}
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak
            kullanılamıyor olabilir.
          </p>

          {/* CTA Butonları */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
            >
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Ana Sayfaya Dön
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <Link href="/appointment">
                <CalendarDays className="mr-2 h-5 w-5" />
                Randevu Al
              </Link>
            </Button>
          </div>

          {/* Yardımcı Linkler */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Ana Sayfa
            </Link>
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              İletişim
            </Link>
            <Link
              href="/#hizmetler"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Hizmetler
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
