import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Admin panelinden herkese açık içerik değiştiğinde çağrılır.
 *
 * - Veri önbelleğini (unstable_cache etiketi) hemen düşürür. 'default' profili
 *   stale-while-revalidate olduğu için ilk istek yine eski veriyi alıp sayfayı
 *   1 gün boyunca eski haliyle önbelleğe yazabiliyordu.
 * - Tüm sayfaları (layout dahil) yeniler; içerik anasayfa, liste, detay,
 *   footer/header gibi birden çok yerde kullanıldığı için tek tek path saymıyoruz.
 *   Sayfalar yalnızca bir sonraki ziyarette yeniden üretilir.
 */
export function revalidatePublicContent(...tags: string[]) {
  for (const tag of tags) {
    revalidateTag(tag, { expire: 0 });
  }
  revalidatePath('/', 'layout');
}
