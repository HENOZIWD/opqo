import { pageTitleStyle } from '@/app/common.css';
import StudioInfoFetcher from '@/fetcher/studioInfoFetcher/component';

export default function StudioInfoPage() {
  return (
    <main>
      <h1 className={pageTitleStyle}>내 채널 정보</h1>
      <StudioInfoFetcher />
    </main>
  );
}
