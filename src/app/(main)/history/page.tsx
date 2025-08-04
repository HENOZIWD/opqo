import { pageStyle } from '@/styles/common/pageStyle.css';
import { Metadata } from 'next';
import WatchHistoryFetcher from './modules/components/watchHistoryFetcher';

export const metadata: Metadata = { title: '시청 기록' };

export default function HistoryPage() {
  return (
    <main>
      <h1 className={pageStyle.pageTitle}>시청 기록</h1>
      <WatchHistoryFetcher />
    </main>
  );
}
