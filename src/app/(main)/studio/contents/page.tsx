import StudioContentsFetcher from '@/fetcher/studioContentsFetcher/component';
import { pageTitleStyle } from '@/app/common.css';

export default function StudioContentsPage() {
  return (
    <main>
      <h1 className={pageTitleStyle}>내 콘텐츠 목록</h1>
      <StudioContentsFetcher />
    </main>
  );
}
