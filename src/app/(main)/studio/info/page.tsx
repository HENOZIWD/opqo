import StudioInfoFetcher from '@/fetcher/studioInfoFetcher';
import { pageStyle } from '@/styles/common.css';
import { Metadata } from 'next';

export const metadata: Metadata = { title: '내 채널 정보' };

export default function StudioInfoPage() {
  return (
    <main>
      <h1 className={pageStyle.pageTitle}>내 채널 정보</h1>
      <StudioInfoFetcher />
    </main>
  );
}
