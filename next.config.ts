import type { NextConfig } from 'next';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CDN_HOSTNAME!,
        pathname: '/**/thumbnail.webp',
        port: '',
        search: '',
      },
    ],
  },
  logging: { fetches: { fullUrl: true } },
  output: 'standalone',
};

export default withVanillaExtract(nextConfig);
