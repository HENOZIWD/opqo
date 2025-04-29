import styles from './page.module.css';
import StudioInfoFetcher from '@/fetcher/studioInfoFetcher/component';

export default function StudioInfoPage() {
  return (
    <main>
      <h1 className={styles.title}>내 채널 정보</h1>
      <StudioInfoFetcher />
    </main>
  );
}
