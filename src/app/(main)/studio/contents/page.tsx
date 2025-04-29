import StudioContentsFetcher from '@/fetcher/studioContentsFetcher/component';
import styles from './page.module.css';

export default function StudioContentsPage() {
  return (
    <main>
      <h1 className={styles.title}>내 콘텐츠 목록</h1>
      <StudioContentsFetcher />
    </main>
  );
}
