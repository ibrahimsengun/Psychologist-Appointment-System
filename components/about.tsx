import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <section id="hakkimda" className="py-12 md:py-24">
      <div className="container mx-auto px-4">

        {/* Bölüm 1: Görsel Sol, Metin Sağ */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16 mb-16 lg:mb-24">
          {/* Görsel - Mobilde gizli, masaüstünde görünür */}
          <div className="hidden lg:block lg:w-4/12">
            <div className="sticky top-24">
              <Image
                src="https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/unwatermarked_Gemini_Generated_Image_jbmorwjbmorwjbmo.png"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                alt="Uzman Psikolog Lokman Yılmaz"
                width={736}
                height={1440}
                loading="lazy"
                quality={100}
              />
            </div>
          </div>

          {/* İçerik */}
          <div className="lg:w-8/12 w-full">
            <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
              Samsun Psikolog Hakkında
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Uzm. Psk. Lokman Yılmaz | Samsun Atakum Psikolog
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Merhabalar, ben <strong className="text-foreground">Uzm. Psk. Lokman Yılmaz</strong>. Ondokuz Mayıs Üniversitesi Psikoloji lisans eğitimimi onur derecesiyle, Evlilik ve Aile Danışmanlığı yüksek lisans eğitimimi ise yüksek onur derecesiyle tamamladım. Eğitim sürecimde hem özel hem de devlet kurumlarında staj yaparak farklı danışmanlık alanlarında deneyim kazandım.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Şu anda Samsun Atakum&apos;da psikolog olarak yüz yüze ve online psikolojik danışmanlık hizmeti vermekteyim. Bireysel, çift ve aile danışmanlığı alanlarında; bilimsel temelli ve etik ilkelere bağlı bir anlayışla çalışmaktayım.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Danışmanlık sürecinde psikodinamik yaklaşım, bilişsel davranışçı yaklaşım (BDT) ve çözüm odaklı yaklaşım çerçevesinden faydalanmaktayım. Her danışanın sürecini, bireysel ihtiyaç ve hedefleri doğrultusunda yapılandırılmış ve kişiye özel bir danışmanlık planı çerçevesinde yürütmekteyim.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Atakum&apos;daki ofisimizde yüz yüze görüşmelerin yanı sıra, online psikolog Samsun hizmeti kapsamında şehir dışından ve yurt dışından danışanlarla da çalışmaktayım.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Eğer siz de Samsun psikolog veya Atakum psikolog arayışındaysanız, yüz yüze ya da online psikolojik danışmanlık için benimle iletişime geçebilirsiniz.
            </p>

            {/* Uzmanlık Alanları Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-foreground">Yetişkin Danışmanlığı</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-foreground">Ergen Danışmanlığı</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-foreground">Çocuk Danışmanlığı</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-foreground">Aile ve Çift Danışmanlığı</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-foreground">Bağlanma Odaklı Danışmanlık</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-foreground">Kaygı ve Stres Yönetimi</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-foreground">Travma ve Kriz Sonrası Destek</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-foreground">Duygu Düzenleme Terapileri</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-foreground">Obsesif Düşünceler ve Kontrol</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-foreground">Öz Değer ve Kişisel Sınırlar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ayraç */}
        <div className="border-t border-border my-12 lg:my-16"></div>

        {/* Bölüm 2: Metin Sol, Görsel Sağ */}
        <div className="flex flex-col-reverse lg:flex-row items-start gap-8 lg:gap-16">
          {/* İçerik */}
          <div className="lg:w-7/12 w-full">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Danışmanlık Yaklaşımı
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Lokman Yılmaz, her bireyin yaşam hikâyesinin benzersiz olduğunu kabul eden bütüncül bir yaklaşımı benimser. Bilimsel temelli yöntemlerle güvenli, empatik ve gizliliğe dayalı bir çalışma ortamı oluşturur.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Danışanlarının iç dünyalarını keşfetmelerine, duygularını anlamalarına ve daha işlevsel bir yaşam kurmalarına profesyonel şekilde rehberlik eder.
            </p>

            <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 bg-primary/5 rounded-r-lg">
              <p className="text-xl italic text-foreground font-medium">
                "Kendine faydası olmayanın başkasına nasıl faydası olabilir ki?"
              </p>
            </blockquote>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Bu ilkeyi benimseyen Lokman Yılmaz, mesleki gelişimini sürekli güncelleyerek eğitim ve süpervizyon süreçlerine aktif biçimde devam etmektedir.
            </p>

            {/* Eğitimler */}
            <h4 className="text-xl font-semibold mb-4">Aldığı Eğitimler</h4>
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-muted-foreground">Bilişsel Davranışçı Terapi Uygulayıcı Eğitimi</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-muted-foreground">Çözüm Odaklı Terapi Uygulayıcı Eğitimi</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-muted-foreground">Psikodinamik Terapi Eğitimi</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-muted-foreground">Oyun Terapisi Uygulayıcı Eğitimi</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-muted-foreground">Hipnoterapi Eğitimi</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-muted-foreground">Klinik Görüşme ve Görüşme Teknikleri Eğitimi</span>
              </div>
            </div>

            {/* Hizmet Bilgisi */}
            <div className="bg-muted/50 rounded-xl p-6">
              <p className="text-lg text-foreground">
                <strong>Psikodemy</strong> bünyesinde{' '}
                <Link href="/samsun-psikolog" className="text-primary hover:underline font-semibold">
                  Samsun'da yüz yüze
                </Link>, Türkiye genelinde ise <strong>online danışmanlık</strong> hizmeti sunulmaktadır.
              </p>
            </div>
          </div>

          {/* Görsel */}
          <div className="lg:w-5/12 w-full">
            <div className="sticky top-24">
              <Image
                src="https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/WhatsApp%20Image%202025-12-19%20at%2017.33.35%20(1)%20(2).jpeg"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                alt="Lokman Yılmaz Danışmanlık"
                width={600}
                height={750}
                loading="lazy"
                quality={75}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
