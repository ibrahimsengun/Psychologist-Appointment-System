import { Service } from '@/types/service';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';

export default function Services({ services, totalCount }: { services: Service[]; totalCount?: number }) {
  return (
    <section id="hizmetler" className="container py-16 md:py-24 scroll-mt-20">
      <SectionHeading
        index="01"
        label="Danışmanlık Alanları"
        title={
          <>
            Hangi konularda <em className="text-primary">destek</em> alabilirsiniz?
          </>
        }
        intro="Samsun Atakum'da yüz yüze ve online; bilimsel temelli yaklaşımlarla size özel danışmanlık."
      />

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16">
        {services.map((service, index) => {
          const hasSlug = service.slug && service.slug.length > 0;
          const content = (
            <>
              <span className="font-heading text-sm text-clay pt-2 w-8 shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl md:text-3xl leading-tight group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                {service.description && (
                  <p className="mt-2 text-muted-foreground leading-relaxed line-clamp-2">{service.description}</p>
                )}
              </div>
              {hasSlug && (
                <span className="mt-1 flex items-center justify-center w-10 h-10 rounded-full border border-foreground/20 shrink-0 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H8M17 7v9" />
                  </svg>
                </span>
              )}
            </>
          );

          return (
            <li key={service.id} className="border-t border-foreground/15">
              {hasSlug ? (
                <Link
                  href={`/hizmetler/${service.slug}`}
                  title={`${service.name} Hizmet Detayları`}
                  className="group flex items-start gap-4 py-7"
                >
                  {content}
                </Link>
              ) : (
                <div className="group flex items-start gap-4 py-7">{content}</div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="border-t border-foreground/15 pt-8">
        <Link href="/hizmetler" title="Tüm Psikolojik Danışmanlık Hizmetlerini Gör" className="link-underline">
          {totalCount && totalCount > services.length ? `Tüm ${totalCount} hizmeti görün` : 'Tüm hizmetleri görün'}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
