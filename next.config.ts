import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.apismart.projection-learn.website",
      },
            {
        protocol: 'https',
        hostname: 'api.smart-nanny.com',
        pathname: '/**',
      },

    ],
  },
};

export default nextConfig;

