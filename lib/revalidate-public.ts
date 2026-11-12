import { revalidatePath, updateTag } from 'next/cache';

/**
 * Admin panelinden herkese açık içerik değiştiğinde çağrılır (yalnızca Server
 * Action içinden; updateTag başka yerde hata fırlatır).
 *
 * - updateTag veri önbelleğini anında düşürür; sayfa yeniden üretilirken eski
 *   veriyi okuyup 1 gün daha eski haliyle önbelleğe yazmasını engeller.
 * - Tüm sayfaları (layout dahil) yeniler. Her yeniden üretim Vercel ISR yazma
 *   kotasından düşer, bu yüzden sık yapılan blog yayını için
 *   revalidateBlogListing kullanılır.
 */
export function revalidatePublicContent(...tags: string[]) {
  for (const tag of tags) {
    updateTag(tag);
  }
  revalidatePath('/', 'layout');
}

/**
 * Blog yayını/düzenlemesi: yalnızca yazı listesi gösteren sayfaları (anasayfa,
 * /blog, sayfalama, kategoriler, sitemap) ve varsa düzenlenen yazının kendi sayfasını
 * yeniler. Diğer ~150 yazı sayfasına dokunmaz.
 */
export function revalidateBlogListing(slug?: string) {
  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath('/blog/sayfa/[page]', 'page');
  revalidatePath('/blog/kategori/[slug]', 'page');
  revalidatePath('/sitemap.xml');
  if (slug) {
    updateTag(`blog-post-${slug}`);
  }
}
