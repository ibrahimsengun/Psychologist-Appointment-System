import Image from 'next/image';

export default function About() {
  return (
    <section id="hakkimda" className="py-6 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/cc3d6def-ccd8-43e0-a46f-9fa1516f391b.jpg"
              className="rounded-xl shadow-xl"
              alt="About"
              width={600}
              height={500}
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold mb-6">Hakkımda</h2>
            <p className="text-lg mb-6 text-justify">
              Lokman Yılmaz, lisans eğitimini Ondokuz Mayıs Üniversitesi Psikoloji bölümünde onur
              derecesiyle tamamlamıştır. Ardından Ondokuz Mayıs Üniversitesi Evlilik ve Aile
              Danışmanlığı bölümünde yüksek lisansını yüksek onur derecesiyle tamamlamış ve (aile
              danışmanı) uzman ünvanını almıştır.
            </p>
            <p className="text-lg mb-6 text-justify">
              Yılmaz, lisans sürecinde Psikoloji yönetim kurulunda yer almış ve çalışmalarda
              bulunmuş ayrıyeten Malatya ASB kapsamında deprem zamanında, deprem bölgesinde
              depremzedeler üzerine, Malatya özel eğitim kurumunda öğrenci ve aileler üzerine,
              Samsunda birden çok özel klinikte genç, ergen ve yetişkin üzerine çalışmış ve
              stajlarını tamamlamıştır.
            </p>
            <p className="text-lg mb-6 text-justify">
              2024 yılında Samsun İlkadım Psikoloji Merkezinde profesyonel olarak yetişkin, ergen ve
              çocuklara danışmanlık hizmeti vermiştir.
            </p>
            <p className="text-lg mb-6 text-justify">
              Uzmanlık alanını nitelikli kılmak adına; Ondokuz Mayıs Üniversitesi Psikoloji
              bölümünden Bilişsel Davranışçı Terapi, Oyun Terapisi ve Psikolojik Testler
              eğitimlerini almıştır fakat bunlara ek olarak Yüksek Psikoloji Akademisi adı altında
              Uzman Klinik Psikolog Nurdan ÖKTEN'den “Bilişsel Davranışçı Terapi Uygulayıcı
              Eğitimini, Prof. Dr Veli DUYAN'dan Çözüm Odaklı Terapi Uygulayıcı
              Eğitimini,Uz.Kl.Psk.Dan Raşide YILMAZ'dan Oyun Terapisi Uyguayıcı Eğtimini ve Prof.Dr.
              Doğan Şahin'den Psikodinamik Terapi eğitimini tamamlamıştır. Ek olarak Süpervizyon
              eğtimleri almıştır.
            </p>
            <p className="text-lg mb-6 text-justify">
              “Kendine faydası olmayanın başkasına nasıl faydası olabilir ki?” anlayışıyla sürekli
              kendini geliştirmeyi amaçlayan Lokman Yılmaz, Şuanda yine Samsunda yüzyüze Psikodemy
              bünyesi altında danışmanlık hizmeti vermekle beraber Online Danışmanlık hizmeti
              sunmaktan memnuniyet duymaktadır.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
