import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CDN_HOSTNAME!,
        port: '',
        pathname: '/profiles/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CDN_HOSTNAME!,
        port: '',
        pathname: '/thumbnail/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
