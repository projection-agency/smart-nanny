import type { NextConfig } from 'next'; // eslint-disable-line @typescript-eslint/no-unused-vars


const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.smart-nanny.com',
        pathname: '/**',
      },
    ],
  },
  output: 'export',
};

export default nextConfig;
