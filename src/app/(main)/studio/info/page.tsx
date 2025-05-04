import StudioInfoFetcher from '@/fetcher/studioInfoFetcher';
import { pageStyle } from '@/styles/common.css';

export default function StudioInfoPage() {
  return (
    <main>
      <h1 className={pageStyle.pageTitle}>내 채널 정보</h1>
      <StudioInfoFetcher />
    </main>
  );
}
