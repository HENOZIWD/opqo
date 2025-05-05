import VideoListSkeleton from '@/components/video/videoListSkeleton';
import StudioContentsFetcher from '@/fetcher/studioContentsFetcher';
import { pageStyle } from '@/styles/common.css';
import { videoListStyle } from '@/styles/video.css';
import { Suspense } from 'react';

export default function StudioContentsPage() {
  return (
    <main>
      <h1 className={pageStyle.pageTitle}>내 콘텐츠 목록</h1>
      <section className={videoListStyle.section}>
        <h2 className={videoListStyle.title}>업로드 한 동영상</h2>
        <Suspense fallback={<VideoListSkeleton />}>
          <StudioContentsFetcher />
        </Suspense>
      </section>
    </main>
  );
}
