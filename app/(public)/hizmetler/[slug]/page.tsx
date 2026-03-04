import { getServiceBySlug } from '@/actions/service-actions';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

function calculateReadingTime(content: string): number {
    const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = plainText.split(/\s+/).length;
    const wordsPerMinute = 200;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = (await params).slug;
    const service = await getServiceBySlug(slug);

    const description = service.meta_description || service.excerpt || service.description || '';

    return {
        title: `${service.name} | Uzman Psk. Lokman Yılmaz`,
        description: description,
        openGraph: {
            title: `${service.name} | Uzman Psk. Lokman Yılmaz`,
            description: description,
            type: 'website',
            images: service.cover_image ? [{ url: service.cover_image }] : undefined
        },
        twitter: {
            card: 'summary_large_image',
            title: `${service.name} | Uzman Psk. Lokman Yılmaz`,
            description: description,
            images: service.cover_image ? [service.cover_image] : undefined
        },
        alternates: {
            canonical: `https://lokmanyilmaz.com.tr/hizmetler/${slug}`
        }
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let service;
    try {
        service = await getServiceBySlug(slug);
    } catch {
        notFound();
    }

    if (!service) {
        notFound();
    }

    const readingTime = calculateReadingTime(service.content);
    const description = service.meta_description || service.excerpt || service.description || '';

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        description: description,
        image: service.cover_image ? [service.cover_image] : [],
        provider: {
            '@type': 'Person',
            name: 'Lokman Yılmaz',
            url: 'https://lokmanyilmaz.com.tr'
        },
        areaServed: {
            '@type': 'City',
            name: 'Samsun'
        },
        url: `https://lokmanyilmaz.com.tr/hizmetler/${slug}`
    };

    return (
        <article className="container py-8 max-w-6xl">
            <Breadcrumb
                items={[{ label: 'Hizmetler', href: '/hizmetler' }, { label: service.name }]}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {service.status !== 'published' && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border-2 border-yellow-500/30 bg-yellow-50 dark:bg-yellow-950/30 px-5 py-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-white text-xs font-bold">!</span>
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Bu hizmet henüz <strong>taslak</strong> aşamasındadır ve ziyaretçiler tarafından görüntülenemez.
                    </p>
                </div>
            )}

            <h1 className="text-4xl font-bold mb-4">{service.name}</h1>

            <div className="flex items-center gap-4 text-muted-foreground mb-8">
                <span>
                    {new Date(service.created_at).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </span>
                {service.content && (
                    <>
                        <span>•</span>
                        <span>{readingTime} dk okuma</span>
                    </>
                )}
            </div>

            {service.cover_image && (
                <div className="relative aspect-video mb-8">
                    <Image
                        src={service.cover_image}
                        alt={service.name}
                        fill
                        className="object-cover rounded-lg"
                        priority
                    />
                </div>
            )}

            {service.content && (
                <div
                    className="prose prose-lg dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: service.content }}
                />
            )}
        </article>
    );
}
