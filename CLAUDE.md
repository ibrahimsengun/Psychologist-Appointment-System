# Claude Yönlendirmesi

@PROJECT_INSTRUCTIONS.md

## Her işte

- Kullanıcıyla Türkçe konuş. Site metinleri de Türkçe olur.
- Dosya değiştiren her işi bitirmeden `CHANGELOG.md`, `package.json` ve `package-lock.json` sürümlerini "Sürümleme ve değişiklik günlüğü" bölümüne göre güncelle. Bu adımı kullanıcı istemese de yap.
- Aynı oturumdaki birbirine bağlı düzeltmeleri, henüz commit edilmemişlerse tek sürüm kaydında topla.
- Kod değiştirdikten sonra `npx tsc --noEmit` ve `npx next build` çalıştır. Sonucu olduğu gibi bildir.

## Dikkat

- Yerel site canlı Supabase veritabanına bağlıdır. Yerelde randevu, soru veya iletişim formu göndermek gerçek kayıt ve e-posta oluşturur.
- `master` dalına push canlıya çıkar; commit ve push'u yalnızca kullanıcı isteyince yap.
- Canlı veritabanı migration'larında "Migration kuralları" bölümündeki sırayı izle.
- `.claude/` klasörünü commit'e ekleme.
