import StudioContentsFetcher from '@/fetcher/studioContentsFetcher/component';
import { commonStyle } from '@/styles/common.css';

export default function StudioContentsPage() {
  return (
    <main>
      <h1 className={commonStyle.pageTitle}>내 콘텐츠 목록</h1>
      <StudioContentsFetcher />
    </main>
  );
}
