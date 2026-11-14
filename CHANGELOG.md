# Değişiklik Günlüğü

Bu projedeki önemli değişiklikler burada tutulur. Sürümler [SemVer](https://semver.org/lang/tr/) kuralını izler.

## [1.2.0] - 2026-11-14

### Eklendi

- Blog yazılarına yazıya özel 3 soruluk "Sık Sorulan Sorular" bölümü eklendi. Admin panelinde yazı düzenlerken SEO ayarlarının altından doldurulur; doldurulan sorular yazının sonunda gösterilir ve arama motorlarına FAQ yapısal verisi olarak iletilir. Boş bırakılan sorular yayınlanmaz.

### Değişti

- `009_add_faqs_to_blog_posts.sql` migration'ı canlı veritabanına uygulandı; `blog_posts` tablosuna boş varsayılanlı `faqs` sütunu eklendi, mevcut yazılar değişmedi.

### Güvenlik

- Sayfalara eklenen yapısal veri (JSON-LD) içindeki `<` karakteri kaçırılıyor; metin içindeki bir etiket sayfa koduna karışamıyor.

## [1.1.3] - 2026-11-12

### Düzeltildi

- Yeni blog yazıları `/blog` listesinde ve kategori sayfalarında gecikmeden görünüyor; liste verisi artık ikinci bir önbellekte bekletilmiyor.
- Yazı yayınlanınca anasayfa, blog listesi, sayfalama, kategori sayfaları ve sitemap doğrudan yenileniyor.

## [1.1.2] - 2026-11-09

### Düzeltildi

- Blog yazılarının arama sonucu başlığına "Samsun Psikolog Lokman Yılmaz" ifadesi geri eklendi; sayfada görünen başlık temiz kalıyor.

## [1.1.1] - 2026-11-09

### Değişti

- Proje talimatlarına dal kullanımı kuralı eklendi: çalışmalar `master` üzerinde, denemeler `master-preview` dalında yapılıyor.

## [1.1.0] - 2026-11-09

### Eklendi

- Eğitim ve çalışma alanlarını anlatan `/hakkimda` sayfası eklendi; menü ve yazar bağlantıları bu sayfaya gidiyor.
- Blog yazılarına konuyla ilgili hizmet ve yerel sayfa bağlantıları eklendi.
- Samsun ve Atakum sayfalarındaki hizmet adları ilgili hizmet sayfalarına bağlandı.

### Değişti

- Psikolojik testler siteden kaldırıldı; `/testler` sayfaları artık açılmıyor.
- Blog başlıklarındaki "| Samsun Atakum Psikolog" ekleri sayfada ve arama sonucu başlığında gösterilmiyor.
- Ana sayfanın arama sonucu açıklaması yenilendi.

### Düzeltildi

- Blog yazılarındaki 404 veren dil bağlantısı kaldırıldı.
- Yeni blog yazıları deploy beklemeden sitemap'e giriyor; yayınlanmış soru yokken `/soru-cevap` sitemap'te yer almıyor.
- Yeni blog adreslerine başlıktaki "|" yüzünden "-or-" eklenmiyor.
- Samsun ve Atakum sayfalarında yalnızca yayınlanmış hizmetler listeleniyor.

## [1.0.2] - 2026-11-09

### Eklendi

- Proje talimatları (`PROJECT_INSTRUCTIONS.md`), Claude yönlendirmesi (`CLAUDE.md`) ve bu değişiklik günlüğü eklendi.
- `package.json` dosyasına sürüm numarası eklendi.

## [1.0.1] - 2026-11-09

### Güvenlik

- Admin randevu, soru, mesaj ve dashboard işlemlerine giriş kontrolü eklendi.
- Girişsiz kullanıcılar admin panelinden giriş sayfasına yönlendiriliyor.
- Randevu alma, iptal ve soru takibi veritabanı fonksiyonlarına taşındı (migration 007).
- İptal kodları güvenli rastgele sayı üreteciyle oluşturuluyor.
- Randevu, iletişim ve slot tablolarında RLS açıldı; ziyaretçiler soruların yalnızca yayınlanmış olanlarını, kişisel olmayan alanlarla görebiliyor (migration 008).

### Düzeltildi

- Site üzerinden randevu alma yeniden çalışıyor; müsaitlik haftalık takvime göre doğrulanıyor.
- Alınan randevular takvimde dolu görünüyor, admin iptalinde saat yeniden açılıyor.
- Telefon ve kodla iptal, telefondaki boşluklar yüzünden başarısız olmuyor.

## [1.0.0]

Sürüm takibi başlamadan önceki durum.
