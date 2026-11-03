import Link from 'next/link';
import Image from 'next/image';
import { TrackedLink } from '@/components/tracked-link';

interface HeroProps {
  rating?: { average: number; count: number };
}

export default function Hero({ rating }: HeroProps) {
  return (
    <section className="container pt-10 md:pt-16 lg:pt-20 pb-16 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Metin */}
        <div className="lg:col-span-7">
          <h1>
            <span className="eyebrow block mb-6 font-sans">
              Samsun Psikolog &amp; Aile Danışmanı · Uzm. Psk. Lokman Yılmaz
            </span>
            <span className="block text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[5.25rem] lg:leading-[1.02]">
              Kendinizi <em className="text-primary">duyulmuş</em> hissedeceğiniz bir alan.
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Atakum&apos;daki ofiste yüz yüze, Türkiye&apos;nin her yerinden online. Yetişkin, çocuk ve aile
            danışmanlığında bilimsel temelli, gizliliğe dayalı psikolojik destek.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <TrackedLink
              href="/appointment"
              title="Hemen Randevu Al"
              event="click_appointment"
              eventSource="hero"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground text-background pl-7 pr-5 py-4 font-medium hover:bg-primary transition-colors"
            >
              Randevu Al
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-background/15 group-hover:translate-x-1 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </TrackedLink>
            <Link href="/hakkimda" title="Hakkımda Daha Fazla Bilgi" className="link-underline">
              Lokman Yılmaz&apos;ı tanıyın
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-foreground/15 pt-6 max-w-xl">
            <div>
              <dt className="eyebrow mb-2">Konum</dt>
              <dd className="font-heading text-lg md:text-xl">Atakum, Samsun</dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">Görüşme</dt>
              <dd className="font-heading text-lg md:text-xl">Yüz yüze &amp; Online</dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">Yorumlar</dt>
              <dd className="font-heading text-lg md:text-xl">
                {rating && rating.count > 0 ? (
                  <Link href="#yorumlar" title="Danışan Yorumları" className="hover:text-primary transition-colors">
                    <span className="text-clay">★</span> {rating.average.toFixed(1)}{' '}
                    <span className="text-muted-foreground text-base">({rating.count})</span>
                  </Link>
                ) : (
                  'Gizlilik esaslı'
                )}
              </dd>
            </div>
          </dl>
        </div>

        {/* Görsel */}
        <figure className="lg:col-span-5">
          <div className="relative aspect-[4/3] sm:aspect-[4/5] lg:max-h-[78vh] lg:w-full overflow-hidden rounded-sm bg-muted">
            <Image
              src="https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/WhatsApp%20Image%202026-04-05%20at%2013.58.05.jpeg"
              alt="Samsun Psikolog Uzman Psk. Lokman Yılmaz"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-[50%_30%]"
              priority
              fetchPriority="high"
              quality={80}
            />
          </div>
          <figcaption className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
            <span className="font-heading italic">Uzm. Psk. Lokman Yılmaz</span>
            <span>Psikodemy, Atakum</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
