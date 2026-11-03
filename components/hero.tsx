import Link from 'next/link';
import Image from 'next/image';
import { TrackedLink } from '@/components/tracked-link';

interface HeroProps {
  rating?: { average: number; count: number };
}

export default function Hero({ rating }: HeroProps) {
  return (
    <section className="relative lg:min-h-[85vh] flex items-center overflow-hidden">
      {/* Arka Plan Gradientleri */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10 py-8 lg:py-4">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">

          {/* Sol Taraf - İçerik */}
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Üst Badge + Yorum Puanı */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-primary">Samsun | Atakum | Online</span>
              </div>
              {rating && rating.count > 0 && (
                <Link
                  href="#yorumlar"
                  title="Danışan Yorumları"
                  className="inline-flex items-center gap-1.5 bg-background border border-border rounded-full px-4 py-2 text-sm hover:border-primary/40 transition-colors"
                >
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold text-foreground">{rating.average.toFixed(1)}</span>
                  <span className="text-muted-foreground">· {rating.count} danışan yorumu</span>
                </Link>
              )}
            </div>

            {/* Ana Başlık */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Samsun Psikolog</span>
              <br />
              <span className="text-primary italic">&</span>
              <span className="text-foreground"> Aile Danışmanı</span>
            </h1>

            {/* Alt Başlık */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Samsun'un Atakum, İlkadım, Canik ve tüm ilçelerinde yetişkin, çocuk ve aile danışmanlığı alanlarında bilimsel temelli, güvenli ve empatik profesyonel psikolojik destek.
              <span className="text-foreground font-medium"> Yüz yüze ve online</span> danışmanlık hizmeti.
            </p>

            {/* CTA Butonları */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-10">
              <TrackedLink
                href="/appointment"
                title="Hemen Randevu Al"
                event="click_appointment"
                eventSource="hero"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold
                         hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1"
              >
                <span>Randevu Al</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </TrackedLink>
              <Link
                href="/hakkimda"
                title="Hakkımda Daha Fazla Bilgi"
                className="inline-flex items-center justify-center gap-2 bg-background border-2 border-border px-8 py-4 rounded-xl font-semibold
                         hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <span>Hakkımda</span>
              </Link>
            </div>

            {/* Güven Göstergeleri */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Gizlilik Garantisi</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Esnek Randevu</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Online Görüşme</span>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Görsel */}
          <div className="lg:w-1/2 relative order-first lg:order-none">
            <div className="relative w-36 sm:w-44 lg:w-auto lg:max-w-lg mx-auto">
              {/* Dekoratif Çerçeve */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-accent to-transparent rounded-full lg:rounded-3xl blur-2xl"></div>

              {/* Ana Görsel */}
              <div className="relative aspect-square lg:aspect-auto rounded-full lg:rounded-3xl overflow-hidden shadow-2xl border-4 border-background lg:border lg:border-border/50">
                <Image
                  src="https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/WhatsApp%20Image%202026-04-05%20at%2013.58.05.jpeg"
                  alt="Samsun Psikolog Uzman Psk. Lokman Yılmaz"
                  width={550}
                  height={700}
                  sizes="(max-width: 1024px) 176px, 550px"
                  className="w-full h-full lg:h-auto object-cover object-top max-h-[700px]"
                  priority
                  fetchPriority="high"
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgcI/8QAIhAAAQMEAgIDAAAAAAAAAAAAAQIDBAAFBhEHIRIxQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAABAX/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADERIh/9oADAMBAAIRAxEAPwCa4ryCmFbLHAjQkvTpMdL7ynH/ABQ2FKA0BonZHenaj+S8lzbxNdadurgEdtRR4REaA7/VGiiUjXod1hqaHGdl2TJ/Gf/Z"
                />
              </div>

              {/* Floating Card - Sol Alt */}
              <div className="absolute -left-4 bottom-8 bg-background/95 backdrop-blur-sm border border-border/50 rounded-2xl p-4 shadow-xl hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
              <div className="absolute -right-4 top-8 bg-background/95 backdrop-blur-sm border border-border/50 rounded-2xl p-4 shadow-xl hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Samsun Atakum</p>
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
