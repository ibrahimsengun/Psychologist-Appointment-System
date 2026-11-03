import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';

const EXPERTISE: Array<{ label: string; href?: string; title?: string }> = [
  { label: 'Yetişkin Danışmanlığı' },
  { label: 'Ergen Danışmanlığı' },
  { label: 'Çocuk Danışmanlığı', href: '/samsun-cocuk-psikologu', title: 'Samsun Çocuk Psikoloğu' },
  { label: 'Aile ve Çift Danışmanlığı', href: '/atakum-aile-danismani', title: 'Atakum Aile Danışmanı' },
  { label: 'Bağlanma Odaklı Danışmanlık' },
  { label: 'Kaygı ve Stres Yönetimi' },
  { label: 'Travma ve Kriz Sonrası Destek' },
  { label: 'Duygu Düzenleme Odaklı Danışmanlık' },
  { label: 'Obsesif Düşünceler ve Kontrol' },
  { label: 'Öz Değer ve Kişisel Sınırlar' }
];

// Eğitim adları belgelerde yazdığı gibi kalmalı
const TRAININGS = [
  'Bilişsel Davranışçı Terapi Uygulayıcı Eğitimi',
  'Çözüm Odaklı Terapi Uygulayıcı Eğitimi',
  'Psikodinamik Terapi Eğitimi',
  'Oyun Terapisi Uygulayıcı Eğitimi',
  'Hipnoterapi Eğitimi',
  'Klinik Görüşme ve Görüşme Teknikleri Eğitimi'
];

const HIGHLIGHTS = [
  { value: 'OMÜ', label: 'Psikoloji (Onur Derecesi)' },
  { value: 'Y. Lisans', label: 'Evlilik ve Aile Danışmanlığı' },
  { value: 'Atakum', label: 'Yüz Yüze ve Online' }
];

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ExpertiseList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
      {EXPERTISE.map((item) => (
        <div key={item.label} className="flex items-start gap-3">
          <CheckIcon />
          {item.href ? (
            <Link href={item.href} title={item.title} className="text-foreground hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}

/** Ana sayfadaki kısa tanıtım; tüm detaylar /hakkimda sayfasında */
export default function About() {
  return (
    <section id="hakkimda" className="container py-16 md:py-24 scroll-mt-20">
      <SectionHeading index="02" label="Hakkımda" title={<>Merhaba, ben <em className="text-primary">Lokman.</em></>} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <figure className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
            <Image
              src="https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/WhatsApp%20Image%202025-12-19%20at%2017.33.35%20(1)%20(2).jpeg"
              className="object-cover object-top"
              alt="Samsun Atakum Aile Danışmanı Lokman Yılmaz"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              loading="lazy"
              quality={75}
            />
          </div>
        </figure>

        <div className="lg:col-span-7 flex flex-col">
          <p className="text-xl md:text-2xl leading-relaxed text-foreground">
            Ondokuz Mayıs Üniversitesi Psikoloji lisans eğitimimi onur derecesiyle, Evlilik ve Aile
            Danışmanlığı yüksek lisansımı yüksek onur derecesiyle tamamladım.
          </p>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Samsun Atakum&apos;da yüz yüze, Türkiye genelinde ve yurt dışında online psikolojik danışmanlık
            veriyorum. Bireysel, çift ve aile danışmanlığında psikodinamik, bilişsel davranışçı (BDT) ve
            çözüm odaklı yaklaşımlardan yararlanarak her danışan için kişiye özel bir süreç planlıyorum.
          </p>

          <blockquote className="my-10 lg:my-12 border-l-2 border-clay pl-6">
            <p className="font-heading italic text-2xl md:text-3xl leading-snug text-foreground">
              &ldquo;Kendine faydası olmayanın başkasına nasıl faydası olabilir ki?&rdquo;
            </p>
          </blockquote>

          <dl className="grid grid-cols-3 gap-4 border-t border-foreground/15 pt-6">
            {HIGHLIGHTS.map((item) => (
              <div key={item.value}>
                <dt className="font-heading text-2xl md:text-3xl text-primary">{item.value}</dt>
                <dd className="mt-1 text-sm text-muted-foreground leading-snug">{item.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <Link href="/hakkimda" title="Uzm. Psk. Lokman Yılmaz Hakkında" className="link-underline">
              Eğitimler, yaklaşım ve uzmanlık alanları <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** /hakkimda sayfasının tam içeriği */
export function AboutFull() {
  return (
    <div className="container mx-auto px-4">
      {/* Bölüm 1: Görsel Sol, Metin Sağ */}
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 mb-16 lg:mb-24">
        <div className="hidden lg:block lg:w-4/12">
          <div className="sticky top-24">
            <Image
              src="https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/unwatermarked_Gemini_Generated_Image_jbmorwjbmorwjbmo.png"
              className="rounded-sm w-full h-auto object-cover"
              alt="Samsun Psikolog Lokman Yılmaz"
              width={736}
              height={1440}
              priority
              quality={75}
            />
          </div>
        </div>

        <div className="lg:w-8/12 w-full">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
            Samsun Atakum Psikolog Hakkında
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Uzm. Psk. Lokman Yılmaz
          </h1>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Merhabalar, ben <strong className="text-foreground">Uzm. Psk. Lokman Yılmaz</strong>.
            Ondokuz Mayıs Üniversitesi Psikoloji lisans eğitimimi onur derecesiyle, Evlilik ve
            Aile Danışmanlığı yüksek lisans eğitimimi ise yüksek onur derecesiyle tamamladım.
            Eğitim sürecimde hem özel hem de devlet kurumlarında staj yaparak farklı danışmanlık
            alanlarında deneyim kazandım.
          </p>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Şu anda Samsun Atakum&apos;da psikolog olarak yüz yüze ve online psikolojik
            danışmanlık hizmeti vermekteyim. Bireysel, çift ve aile danışmanlığı alanlarında;
            bilimsel temelli ve etik ilkelere bağlı bir anlayışla çalışmaktayım.
          </p>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Danışmanlık sürecinde psikodinamik yaklaşım, bilişsel davranışçı yaklaşım (BDT) ve
            çözüm odaklı yaklaşım çerçevesinden faydalanmaktayım. Her danışanın sürecini, bireysel
            ihtiyaç ve hedefleri doğrultusunda yapılandırılmış ve kişiye özel bir danışmanlık
            planı çerçevesinde yürütmekteyim.
          </p>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Atakum&apos;daki ofisimizde yüz yüze görüşmelerin yanı sıra, online psikolog Samsun
            hizmeti kapsamında şehir dışından ve yurt dışından danışanlarla da çalışmaktayım.
          </p>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Eğer siz de Samsun psikolog veya Atakum psikolog arayışındaysanız, yüz yüze ya da
            online psikolojik danışmanlık için benimle iletişime geçebilirsiniz.
          </p>

          <h2 className="text-2xl font-bold mb-5">Uzmanlık Alanları</h2>
          <ExpertiseList />
        </div>
      </div>

      <div className="border-t border-border my-12 lg:my-16"></div>

      {/* Bölüm 2: Metin Sol, Görsel Sağ */}
      <div className="flex flex-col-reverse lg:flex-row items-start gap-8 lg:gap-16">
        <div className="lg:w-7/12 w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Danışmanlık Yaklaşımı</h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Lokman Yılmaz, her bireyin yaşam hikâyesinin benzersiz olduğunu kabul eden bütüncül
            bir yaklaşımı benimser. Bilimsel temelli yöntemlerle güvenli, empatik ve gizliliğe
            dayalı bir çalışma ortamı oluşturur.
          </p>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Danışanlarının iç dünyalarını keşfetmelerine, duygularını anlamalarına ve daha
            işlevsel bir yaşam kurmalarına profesyonel şekilde rehberlik eder.
          </p>

          <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 bg-primary/5 rounded-r-lg">
            <p className="text-xl italic text-foreground font-medium">
              &quot;Kendine faydası olmayanın başkasına nasıl faydası olabilir ki?&quot;
            </p>
          </blockquote>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Bu ilkeyi benimseyen Lokman Yılmaz, mesleki gelişimini sürekli güncelleyerek eğitim ve
            süpervizyon süreçlerine aktif biçimde devam etmektedir.
          </p>

          <h3 className="text-xl font-semibold mb-4">Aldığı Eğitimler</h3>
          <div className="space-y-3 mb-8">
            {TRAININGS.map((training) => (
              <div key={training} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-muted-foreground">{training}</span>
              </div>
            ))}
          </div>

          <div className="bg-muted/50 rounded-xl p-6">
            <p className="text-lg text-foreground">
              <strong>Samsun Atakum&apos;da</strong> yüz yüze, Türkiye genelinde ise{' '}
              <strong>online danışmanlık</strong> hizmeti sunulmaktadır.
            </p>
          </div>
        </div>

        <div className="lg:w-5/12 w-full">
          <div className="sticky top-24">
            <Image
              src="https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/WhatsApp%20Image%202025-12-19%20at%2017.33.35%20(1)%20(2).jpeg"
              className="rounded-sm w-full h-auto object-cover"
              alt="Samsun Atakum Aile Danışmanı Lokman Yılmaz"
              width={600}
              height={750}
              loading="lazy"
              quality={75}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
