import StudioInfoFetcher from '@/fetcher/studioInfoFetcher/component';
import { commonStyle } from '@/styles/common.css';

export default function StudioInfoPage() {
  return (
    <main>
      <h1 className={commonStyle.pageTitle}>내 채널 정보</h1>
      <StudioInfoFetcher />
    </main>
  );
}
