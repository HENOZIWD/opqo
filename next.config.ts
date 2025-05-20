import type { NextConfig } from 'next';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CDN_HOSTNAME!,
        port: '',
        pathname: '/profile/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CDN_HOSTNAME!,
        port: '',
        pathname: '/content/thumbnail/**',
        search: '',
      },
    ],
  },
  logging: { fetches: { fullUrl: true } },
  output: 'standalone',
};

export default withVanillaExtract(nextConfig);
