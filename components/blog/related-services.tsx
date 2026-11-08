import Link from 'next/link';
import type { Service } from '@/types/service';

const SAMSUN = { href: '/samsun-psikolog', label: 'Samsun Psikolog' };
const COCUK = { href: '/samsun-cocuk-psikologu', label: 'Samsun Çocuk Psikoloğu' };
const AILE = { href: '/atakum-aile-danismani', label: 'Atakum Aile Danışmanı' };

// Sıra önemli: yazılarda birden çok kategori olur, en özel olan önce eşleşir.
const CATEGORY_LINKS = [
  { category: 'cocuk-psikolojisi', services: ['cocuk-ve-ergen-danismanligi', 'ebeveyn-danismanligi'], local: COCUK },
  { category: 'ergen-danismanligi', services: ['cocuk-ve-ergen-danismanligi', 'ebeveyn-danismanligi'], local: COCUK },
  { category: 'cift-terapisi', services: ['cift-ve-aile-danismanligi'], local: AILE },
  { category: 'aile-ici-iletisim', services: ['cift-ve-aile-danismanligi', 'ebeveyn-danismanligi'], local: AILE },
  { category: 'kaygi-ve-stres', services: ['kaygi-ve-stres-yonetimi', 'anksiyete'], local: SAMSUN },
  { category: 'kisisel-gelisim', services: ['ozguven-ve-kisisel-gelisim'], local: SAMSUN }
];

const DEFAULT_LINKS = { services: ['bireysel-danismanlik'], local: SAMSUN };

interface RelatedServicesProps {
  categorySlugs: string[];
  services: Service[];
}

export function RelatedServices({ categorySlugs, services }: RelatedServicesProps) {
  const match = CATEGORY_LINKS.find((item) => categorySlugs.includes(item.category)) ?? DEFAULT_LINKS;
  const links = [...match.services, 'online-danismanlik']
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is Service => Boolean(service));

  if (links.length === 0) return null;

  return (
    <aside className="mt-12 rounded-2xl border border-border/50 bg-muted/30 p-6">
      <h2 className="text-xl font-semibold mb-4">Bu konuyla ilgili çalışma alanları</h2>
      <ul className="flex flex-wrap gap-3">
        {links.map((service) => (
          <li key={service.id}>
            <Link
              href={`/hizmetler/${service.slug}`}
              className="inline-block rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:border-primary/50 hover:text-primary transition-colors"
            >
              {service.name.trim()}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">
        Yüz yüze görüşme bilgileri için:{' '}
        <Link href={match.local.href} className="text-primary hover:underline font-medium">
          {match.local.label}
        </Link>
      </p>
    </aside>
  );
}
