import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ToastProvider from '@/contexts/toast';
import TokenProvider from '@/contexts/token';
import { getAccessTokenCookie } from '@/serverActions/token';

export const metadata: Metadata = {
  title: {
    template: '%s | OpqO',
    default: 'OpqO',
  },
};

const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/NanumSquareNeoOTF-Rg.otf',
      weight: '400',
    },
    {
      path: '../../public/fonts/NanumSquareNeoOTF-Eb.otf',
      weight: '700',
    },
    {
      path: '../../public/fonts/NanumSquareNeoOTF-Hv.otf',
      weight: '900',
    },
  ],
  display: 'swap',
});

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const accessToken = await getAccessTokenCookie();

  return (
    <html lang="ko">
      <body className={`${myFont.className}`}>
        <ToastProvider>
          <TokenProvider token={accessToken ?? null}>
            {children}
          </TokenProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
