import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'amajmmkliepackibyxqe.supabase.co',
        pathname: '/storage/**'
      }
    ],
    // Optimize image sizes for better FCP
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Use modern formats for smaller file sizes
    formats: ['image/avif', 'image/webp'],
    // Cache images for 30 days
    minimumCacheTTL: 60 * 60 * 24 * 30,
  }
};

export default nextConfig;
