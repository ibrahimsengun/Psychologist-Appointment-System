// ============================================================
// Shared Schema.org structured data constants and builders
// ============================================================

// ---- Sabit Değerler ----

export const SITE_URL = 'https://lokmanyilmaz.com.tr';

export const PERSON_NAME = 'Lokman Yılmaz';
export const PERSON_TITLE = 'Uzman Psikolog ve Aile Danışmanı';
export const PERSON_PHONE = '+905448322091';
export const PERSON_EMAIL = 'psk.lokmanylmz@gmail.com';
export const PERSON_IMAGE =
    'https://amajmmkliepackibyxqe.supabase.co/storage/v1/object/public/blog-images/WhatsApp%20Image%202025-12-19%20at%2017.02.36.jpeg';

export const ORG_NAME = 'Psikodemy';

export const ADDRESS_SAMSUN = {
    '@type': 'PostalAddress' as const,
    addressLocality: 'Samsun',
    addressRegion: 'Atakum',
    addressCountry: 'TR',
};

export const ADDRESS_ATAKUM = {
    '@type': 'PostalAddress' as const,
    streetAddress: 'Psikodemy',
    addressLocality: 'Atakum',
    addressRegion: 'Samsun',
    addressCountry: 'TR',
};

export const OPENING_HOURS = [
    {
        '@type': 'OpeningHoursSpecification' as const,
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
    },
    {
        '@type': 'OpeningHoursSpecification' as const,
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '14:00',
    },
];

export const AREA_SERVED = [
    {
        '@type': 'City' as const,
        name: 'Samsun',
        '@id': 'https://www.wikidata.org/wiki/Q79876',
    },
    ...(
        ['Atakum', 'İlkadım', 'Canik', 'Bafra'] as const
    ).map((name) => ({
        '@type': 'AdministrativeArea' as const,
        name,
        containedIn: { '@type': 'City' as const, name: 'Samsun' },
    })),
];

// ---- Schema Builder Fonksiyonları ----

/** Kişi (Person) schema'sı */
export function buildPersonSchema(overrides?: {
    description?: string;
    url?: string;
    address?: object;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: PERSON_NAME,
        jobTitle: PERSON_TITLE,
        description: overrides?.description ?? `Samsun Atakum'da psikolog ve aile danışmanlığı hizmeti veren uzman psikolog`,
        image: PERSON_IMAGE,
        url: overrides?.url ?? SITE_URL,
        address: overrides?.address ?? ADDRESS_SAMSUN,
        telephone: PERSON_PHONE,
        email: PERSON_EMAIL,
        worksFor: {
            '@type': 'Organization',
            name: ORG_NAME,
        },
    };
}

/** Profesyonel Hizmet (ProfessionalService) schema'sı – Ana sayfa */
export function buildProfessionalServiceSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: `Uzman Psk. ${PERSON_NAME}`,
        description: 'Samsun Aile Danışmanı ve Psikolojik Destek',
        image: PERSON_IMAGE,
        logo: PERSON_IMAGE,
        url: SITE_URL,
        address: ADDRESS_SAMSUN,
        areaServed: AREA_SERVED,
        telephone: PERSON_PHONE,
        priceRange: '$$',
        openingHoursSpecification: OPENING_HOURS,
    };
}

/** Yerel İşletme (LocalBusiness) schema'sı – Landing page'ler */
export function buildLocalBusinessSchema(options: {
    id: string;
    name: string;
    description: string;
    url: string;
    address?: object;
    geo?: { latitude: string; longitude: string };
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#${options.id}`,
        name: options.name,
        description: options.description,
        url: options.url,
        telephone: PERSON_PHONE,
        email: PERSON_EMAIL,
        address: options.address ?? ADDRESS_SAMSUN,
        ...(options.geo && {
            geo: {
                '@type': 'GeoCoordinates',
                latitude: options.geo.latitude,
                longitude: options.geo.longitude,
            },
        }),
        openingHoursSpecification: OPENING_HOURS,
        priceRange: '$$',
        image: PERSON_IMAGE,
    };
}

/** Breadcrumb schema'sı */
export function buildBreadcrumbSchema(
    items: Array<{ name: string; path?: string }>
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Ana Sayfa',
                item: SITE_URL,
            },
            ...items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 2,
                name: item.name,
                item: item.path ? `${SITE_URL}${item.path}` : undefined,
            })),
        ],
    };
}

/** FAQ schema'sı */
export function buildFAQSchema(
    faqs: Array<{ question: string; answer: string }>
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

/** Blog Yazısı (BlogPosting) schema'sı */
export function buildBlogPostSchema(post: {
    title: string;
    description: string;
    slug: string;
    coverImage?: string | null;
    createdAt: string;
    updatedAt?: string | null;
    wordCount: number;
    keywords?: string;
    section?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: post.coverImage ? [post.coverImage] : [],
        datePublished: post.createdAt,
        dateModified: post.updatedAt ?? post.createdAt,
        wordCount: post.wordCount,
        author: {
            '@type': 'Person',
            name: PERSON_NAME,
            url: SITE_URL,
        },
        publisher: {
            '@type': 'Person',
            name: PERSON_NAME,
            url: SITE_URL,
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/blog/${post.slug}`,
        },
        keywords: post.keywords,
        articleSection: post.section ?? 'Genel',
    };
}

/** Hizmet (Service) schema'sı */
export function buildServiceSchema(service: {
    name: string;
    description: string;
    slug: string;
    coverImage?: string | null;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        description: service.description,
        image: service.coverImage ? [service.coverImage] : [],
        provider: {
            '@type': 'Person',
            name: PERSON_NAME,
            url: SITE_URL,
        },
        areaServed: {
            '@type': 'City',
            name: 'Samsun',
        },
        url: `${SITE_URL}/hizmetler/${service.slug}`,
    };
}

/** JSON-LD script tag'ı oluşturan yardımcı */
export function JsonLd({ data }: { data: object }): JSX.Element {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

