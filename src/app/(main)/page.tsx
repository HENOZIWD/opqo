import { Suspense } from 'react';
import VideoListSkeleton from '@/components/video/videoListSkeleton';
import { videoListStyle } from '@/styles/video/videoListStyle.css';
import VideoListFetcher from './modules/components/videoListFetcher';
import { pageStyle } from '@/styles/common/pageStyle.css';
import LiveStreamListFetcher from './modules/components/liveStreamListFetcher';

export default function MainPage() {
  return (
    <main>
      <h1 className={pageStyle.pageTitle}>추천 동영상 목록</h1>
      <section className={videoListStyle.section}>
        <h2 className={videoListStyle.title}>라이브 중인 방송</h2>
        <Suspense fallback={<VideoListSkeleton />}>
          <LiveStreamListFetcher />
        </Suspense>
      </section>
      <section className={videoListStyle.section}>
        <h2 className={videoListStyle.title}>최근 업로드 된 동영상</h2>
        <Suspense fallback={<VideoListSkeleton />}>
          <VideoListFetcher />
        </Suspense>
      </section>
    </main>
  );
}
