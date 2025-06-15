import type { NextConfig } from 'next';


const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.smart-nanny.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
