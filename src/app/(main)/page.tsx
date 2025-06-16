import { Suspense } from 'react';
import VideoListSkeleton from '@/components/video/videoListSkeleton';
import { videoListStyle } from '@/styles/video.css';
import { pageStyle } from '@/styles/common.css';
import VideoListFetcher from './modules/components/videoListFetcher';

export default function MainPage() {
  return (
    <main>
      <h1 className={pageStyle.pageTitle}>추천 동영상 목록</h1>
      <section className={videoListStyle.section}>
        <h2 className={videoListStyle.title}>최근 업로드 된 동영상</h2>
        <Suspense fallback={<VideoListSkeleton />}>
          <VideoListFetcher category="recent" />
        </Suspense>
      </section>
    </main>
  );
}
