import VideoListSkeleton from '@/components/video/videoListSkeleton/component';
import { videoListStyle } from '@/styles/video/videoList.css';
import { Metadata } from 'next';
import { Suspense } from 'react';
import StudioContentsFetcher from './modules/components/studioContentsFetcher/component';
import { pageStyle } from '@/styles/common/page.css';

export const metadata: Metadata = { title: '내 콘텐츠 목록' };

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
