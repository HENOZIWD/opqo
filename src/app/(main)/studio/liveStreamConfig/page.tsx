import { Metadata } from 'next';
import StreamKeyInfo from './modules/components/streamKeyInfo';
import { pageStyle } from '@/styles/common/pageStyle.css';

export const metadata: Metadata = { title: '라이브 설정' };

export default function LiveStreamConfingPage() {
  return (
    <main>
      <h1 className={pageStyle.pageTitle}>라이브 설정</h1>
      <StreamKeyInfo />
    </main>
  );
}
