import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Arka Plan Gradientleri */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10 mt-4">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-2">

          {/* Sol Taraf - İçerik */}
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Üst Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-primary">Samsun Atakum</span>
            </div>

            {/* Ana Başlık */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Uzman Psikolog</span>
              <br />
              <span className="text-primary">&</span>
              <span className="text-foreground"> Aile Danışmanı</span>
            </h1>

            {/* Alt Başlık */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Bilimsel temelli yaklaşımlarla güvenli, empatik ve gizliliğe dayalı profesyonel psikolojik destek.
              <span className="text-foreground font-medium"> Yüz yüze ve online</span> danışmanlık hizmeti.
            </p>

            {/* CTA Butonları */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10">
              <Link
                href="/appointment"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold
                         hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1"
              >
                <span>Randevu Al</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="#hakkimda"
                className="inline-flex items-center justify-center gap-2 bg-background border-2 border-border px-8 py-4 rounded-xl font-semibold
                         hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <span>Hakkımda</span>
              </Link>
            </div>

            {/* Güven Göstergeleri */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Gizlilik Garantisi</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Esnek Randevu</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Online Görüşme</span>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Görsel */}
          <div className="lg:w-1/2 relative">
            <div className="relative max-w-lg mx-auto">
              {/* Dekoratif Çerçeve */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl blur-2xl"></div>

              {/* Ana Görsel */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                <Image
                  src="https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/WhatsApp%20Image%202025-12-19%20at%2017.02.36.jpeg"
                  alt="Uzman Psikolog Lokman Yılmaz"
                  width={550}
                  height={700}
                  className="w-full h-auto object-cover max-h-[700px]"
                  priority
                />
              </div>

              {/* Floating Card - Sol Alt */}
              <div className="absolute -left-4 bottom-8 bg-background/95 backdrop-blur-sm border border-border/50 rounded-2xl p-4 shadow-xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Yüksek Lisans</p>
                    <p className="text-sm text-muted-foreground">Aile Danışmanlığı</p>
                  </div>
                </div>
              </div>

              {/* Floating Card - Sağ Üst */}
              <div className="absolute -right-4 top-8 bg-background/95 backdrop-blur-sm border border-border/50 rounded-2xl p-4 shadow-xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Psikodemy</p>
                    <p className="text-sm text-muted-foreground">Samsun</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
