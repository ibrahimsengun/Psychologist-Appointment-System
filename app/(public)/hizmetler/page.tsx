import { getPublishedServices } from '@/actions/service-actions';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hizmetlerimiz | Uzman Psk. Lokman Yılmaz',
    description:
        'Bireysel terapi, aile danışmanlığı, çift terapisi ve psikolojik destek hizmetleri. Samsun psikolog Lokman Yılmaz tarafından sunulan profesyonel hizmetler.',
    keywords:
        'psikoloji hizmetleri, aile danışmanlığı, bireysel terapi, çift terapisi, samsun psikolog',
    alternates: {
        canonical: 'https://lokmanyilmaz.com.tr/hizmetler'
    },
    openGraph: {
        title: 'Hizmetlerimiz | Uzman Psk. Lokman Yılmaz',
        description:
            'Profesyonel psikolojik danışmanlık ve terapi hizmetleri.',
        url: 'https://lokmanyilmaz.com.tr/hizmetler',
        siteName: 'Uzman Psk. Lokman Yılmaz',
        locale: 'tr_TR',
        type: 'website'
    }
};

export const revalidate = 3600;

export default async function HizmetlerPage() {
    const services = await getPublishedServices();

    return (
        <div className="container py-8">
            <Breadcrumb items={[{ label: 'Hizmetler' }]} />
            <h1 className="text-4xl font-bold mb-4">Hizmetlerimiz</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                Bilimsel temelli yaklaşımlarla, size özel danışmanlık hizmetleri sunuyoruz
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.length === 0 && (
                    <div className="col-span-full text-center text-gray-500">
                        Henüz hizmet bulunmuyor
                    </div>
                )}
                {services.map((service) => (
                    <Link
                        key={service.id}
                        href={`/hizmetler/${service.slug}`}
                        title={service.name}
                        className="group"
                    >
                        <article className="relative bg-background rounded-2xl border border-border/50 overflow-hidden 
                               transition-all duration-500 ease-out
                               hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-2">
                            {/* Görsel */}
                            {service.cover_image && (
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={service.cover_image}
                                        alt={service.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            )}

                            {/* İçerik */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                                    {service.name}
                                </h3>

                                {service.description && (
                                    <p className="text-muted-foreground line-clamp-3 mb-4">
                                        {service.description}
                                    </p>
                                )}

                                {/* Detayları Gör */}
                                <div className="flex items-center gap-2 text-primary font-medium">
                                    <span className="text-sm">Detayları Gör</span>
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Dekoratif Köşe */}
                            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-lg
                            group-hover:border-primary/50 group-hover:w-12 group-hover:h-12 transition-all duration-500"></div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}
