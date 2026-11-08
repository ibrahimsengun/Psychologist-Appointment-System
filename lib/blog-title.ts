// Eski başlıklardaki "| Samsun Atakum Psikolog" gibi ekleri gösterimden çıkarır; kayıtlı başlık değişmez.
export function cleanBlogTitle(title: string): string {
  return title.replace(/\s*\|\s*[^|]*psikolog[^|]*$/i, '').trim() || title;
}
