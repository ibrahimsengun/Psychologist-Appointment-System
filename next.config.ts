import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'amajmmkliepackibyxqe.supabase.co',
        pathname: '/storage/**'
      }
    ]
  }
};

export default nextConfig;
