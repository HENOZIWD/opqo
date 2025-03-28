'use client';

import VideoListFetcher from '@/fetcher/videoListFetcher/component';
import styles from './page.module.css';

export default function MainPage() {
  return (
    <main>
      <h2 className={styles.sectionTitle}>최근 업로드 된 동영상</h2>
      <VideoListFetcher category="recent" />
    </main>
  );
}
