import VideoListFetcher from '@/fetcher/videoListFetcher/component';
import { Suspense } from 'react';
import VideoListSkeleton from '@/fetcher/videoListFetcher/skeleton';
import { videoSectionStyle, videoSectionTitleStyle } from '@/app/common.css';

export default function MainPage() {
  return (
    <main>
      <section className={videoSectionStyle}>
        <h2 className={videoSectionTitleStyle}>최근 업로드 된 동영상</h2>
        <Suspense fallback={<VideoListSkeleton />}>
          <VideoListFetcher category="recent" />
        </Suspense>
      </section>
    </main>
  );
}
