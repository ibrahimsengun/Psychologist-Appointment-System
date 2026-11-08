# Proje Talimatları

Uzman Psk. Lokman Yılmaz'ın web sitesi: tanıtım sayfaları, blog, online randevu, soru-cevap, psikolojik testler ve admin paneli.

## Teknoloji

- Next.js 16 (App Router, Server Actions), React 18, TypeScript
- Supabase (Postgres, Auth, Storage), Resend (e-posta)
- Tailwind CSS, Radix UI, Tiptap
- Barındırma: Vercel. `master` dalına push canlıya çıkar.

## Yapı

| Klasör | İçerik |
|---|---|
| `app/(public)` | Ziyaretçi sayfaları |
| `app/(protected)` | Admin paneli |
| `actions/` | Server Action'lar |
| `utils/auth.ts` | `requireAdmin` giriş kontrolü |
| `utils/supabase/` | Supabase istemcileri |
| `supabase-migrations/` | Numaralı SQL migration'ları |
| `emails/` | E-posta şablonları |

## Komutlar

```bash
npm run dev
```

```bash
npx tsc --noEmit
```

```bash
npx next build
```

## Güvenlik kuralları

Site danışanların sağlık verisini işler; bu veriler KVKK kapsamında özel niteliklidir.

- Admin işlemi yapan her Server Action `requireAdmin()` ile başlar. Middleware tek başına koruma sayılmaz.
- `public` şemasındaki her tabloda RLS açık olur.
- Ziyaretçi akışları kişisel veri içeren tablolara doğrudan erişmez; `SECURITY DEFINER` RPC kullanır ve `search_path = ''` ayarlanır.
- `SUPABASE_ANON_KEY` ve diğer anahtarlar sunucuda kalır, `NEXT_PUBLIC_` önekiyle yayınlanmaz.
- Ham SQL string'i birleştirilmez.
- Kullanıcıdan gelen veya temizlenmemiş HTML `dangerouslySetInnerHTML` ile basılmaz.

## Migration kuralları

- Dosyalar `supabase-migrations/` altında sıradaki numarayla açılır.
- Canlı kodun kullandığı bir erişimi kaldıran migration, yeni kod yayına girdikten **sonra** uygulanır. Eklemeli migration kod yayınından önce uygulanabilir.
- Uygulanmamış migration'lar `CHANGELOG.md` içinde "Bekliyor" olarak yazılır.

## Sürümleme ve değişiklik günlüğü

Dosya değiştiren her iş aynı değişiklik içinde şunları günceller:

1. `CHANGELOG.md` dosyasının en üstüne yeni sürüm kaydı eklenir.
2. `package.json` içindeki `version` aynı numaraya getirilir.
3. `package-lock.json` içinde en üstteki `version` ve `packages[""].version` alanları aynı numaraya getirilir.

Sürüm numarası [SemVer](https://semver.org/lang/tr/) kuralına göre artar:

| Değişiklik | Artan kısım |
|---|---|
| Geriye uyumsuz değişiklik | `X.0.0` |
| Yeni özellik | `1.X.0` |
| Hata düzeltmesi, güvenlik düzeltmesi, doküman, bakım | `1.0.X` |

Kayıt biçimi:

```markdown
## [1.2.3] - YYYY-AA-GG

### Eklendi
### Değişti
### Düzeltildi
### Güvenlik
### Bekliyor
```

Boş başlıklar yazılmaz. Kayıtlar, kullanıcının ne değiştiğini anlayacağı kısa Türkçe cümlelerle yazılır.

## Commit biçimi

Conventional Commits: `feat(admin): ...`, `fix(blog): ...`, `fix(security): ...`
