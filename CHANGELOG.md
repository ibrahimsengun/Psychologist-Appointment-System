# Değişiklik Günlüğü

Bu projedeki önemli değişiklikler burada tutulur. Sürümler [SemVer](https://semver.org/lang/tr/) kuralını izler.

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
