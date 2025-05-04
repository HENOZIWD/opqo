import StudioContentsFetcher from '@/fetcher/studioContentsFetcher';
import { pageStyle } from '@/styles/common.css';

export default function StudioContentsPage() {
  return (
    <main>
      <h1 className={pageStyle.pageTitle}>내 콘텐츠 목록</h1>
      <StudioContentsFetcher />
    </main>
  );
}
