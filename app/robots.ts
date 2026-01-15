import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/admin/*', '/sign-in', '/reset-password', '/auth', '/auth/*']
            }
        ],
        sitemap: 'https://lokmanyilmaz.com.tr/sitemap.xml',
        host: 'https://lokmanyilmaz.com.tr'
    };
}
