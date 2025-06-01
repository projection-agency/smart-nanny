import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.apismart.projection-learn.website",
      },
    ],
  },
};

export default nextConfig;
