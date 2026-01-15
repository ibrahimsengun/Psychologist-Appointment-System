/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://lokmanyilmaz.com.tr',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: [
    '/admin',
    '/admin/*',
    '/sign-in',
    '/reset-password',
    '/appointment/cancel/*',
    '/auth/*'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/sign-in', '/reset-password', '/auth']
      }
    ]
  },
  transform: async (config, path) => {
    // Set higher priority for important pages
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/samsun-psikolog' || path === '/atakum-psikolog') {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path === '/blog' || path === '/appointment' || path === '/contact') {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/blog/')) {
      priority = 0.7;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined
    };
  }
};
