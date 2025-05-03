import VideoListFetcher from '@/fetcher/videoListFetcher/component';
import { Suspense } from 'react';
import VideoListSkeleton from '@/fetcher/videoListFetcher/skeleton';
import { videoStyle } from '@/styles/video.css';

export default function MainPage() {
  return (
    <main>
      <section className={videoStyle.listSection}>
        <h2 className={videoStyle.listSectionTitle}>최근 업로드 된 동영상</h2>
        <Suspense fallback={<VideoListSkeleton />}>
          <VideoListFetcher category="recent" />
        </Suspense>
      </section>
    </main>
  );
}
