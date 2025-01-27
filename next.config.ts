import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['image.pollinations.ai'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
