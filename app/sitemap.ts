import { getPublishedPosts } from '@/actions/blog-actions';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://lokmanyilmaz.com.tr';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1
        },
        {
            url: `${baseUrl}/samsun-psikolog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9
        },
        {
            url: `${baseUrl}/atakum-psikolog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9
        },
        {
            url: `${baseUrl}/samsun-atakum-psikolog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: `${baseUrl}/atakum-samsun-psikolog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: `${baseUrl}/appointment`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: `${baseUrl}/sss`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3
        }
    ];

    // Dynamic blog posts
    let blogPosts: MetadataRoute.Sitemap = [];
    try {
        const posts = await getPublishedPosts();
        blogPosts = posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updated_at || post.created_at),
            changeFrequency: 'monthly' as const,
            priority: 0.7
        }));
    } catch (error) {
        console.error('Error fetching blog posts for sitemap:', error);
    }

    return [...staticPages, ...blogPosts];
}
