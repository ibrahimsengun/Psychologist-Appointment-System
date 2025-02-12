import Image from 'next/image';

export default function About() {
  return (
    <section id="hakkimda" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="https://arcjovhaayeezgzrbpwj.supabase.co/storage/v1/object/public/blog-images//public.avif"
              alt="Lokman Yılmaz"
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold mb-6">Hakkımda</h2>
            <p className="text-lg mb-6">
              Lokman Yılmaz, lisans eğitimini Ondokuz Mayıs Üniversitesi Psikoloji bölümünde
              tamamlamıştır. Ardından Ondokuz Mayıs Üniversitesi Evlilik ve Aile Danışmanlığı
              bölümünde yüksek lisansa başlamıştır ve hâlihazırda devam etmektedir.
            </p>
            <p className="text-lg mb-6">
              Lokman Yılmaz, lisans sürecinde Psikoloji yönetim kurulunda bulunmuş olup, Malatya ASB
              kapsamında deprem zamanında, deprem bölgesinde, Malatya özel eğitim kurumunda öğrenci
              ve aileler üzerine, Samsunda birden çok özel klinikte çocuk, ergen, yetişkin üzerine
              çalışmış ve stajlarını tamamlamıştır.
            </p>
            <p className="text-lg mb-6">
              2024 yılının yarısından bu yana profesyonel olarak, anksiyete (kaygı) bozuklukları,
              panik bozukluk, yeme bozuklukları, depresyon, okb, fobiler ve sınav süreci üzerine
              danışmanlık hizmeti vermektedir.
            </p>
            <p className="text-lg mb-6">
              Uzmanlık alanını nitelikli kılmak adına; "Bilişsel Davranışçı Terapi Uygulayıcı
              Eğitimi, Oyun Terapisi Uygulayıcı Eğitimi, Çözüm Odaklı Terapi Uygulayıcı Eğitimini
              tamamlamış olup, Psikodinamik Terapi ve Cinsel Terapi eğitimi devam etmektedir.
            </p>
            <p className="text-lg mb-6">
              "Kendine faydası olmayan bir insanın başkasına nasıl faydası olabilir ki?" anlayışıyla
              sürekli kendini geliştirmeyi amaçlayan Lokman Yılmaz, Samsun İlkadım Psikoloji
              Merkezinde yüz yüze, Evimdeki Psikolog bünyesinde ise online danışmanlık hizmeti
              vermektedir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
