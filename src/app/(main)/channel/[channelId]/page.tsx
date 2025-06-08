import { videoListStyle } from '@/styles/video.css';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { Metadata } from 'next';
import { Suspense } from 'react';
import VideoListSkeleton from '@/components/video/videoListSkeleton';
import { getChannelInfo } from './modules/apis/getChannelInfo';
import ChannelProfileSkeleton from './modules/components/channelProfileSkeleton';
import ChannelProfileFetcher from './modules/components/channelProfileFetcher';
import ChannelVideoListFetcher from './modules/components/channelVideoListFetcher';

interface ChannelPageProps { params: Promise<{ channelId: string }> }

export async function generateMetadata({ params }: ChannelPageProps): Promise<Metadata> {
  const { channelId } = await params;

  const { data } = await fetchHandlerWithServerComponent(() => getChannelInfo({ channelId }));

  return {
    title: `${data?.name} 채널`,
    description: `${data?.description}`,
    openGraph: { images: [`${process.env.NEXT_PUBLIC_CDN_CHANNELIMAGE_URL}/${data?.id}`] },
  };
}

export default async function ChannelPage({ params }: ChannelPageProps) {
  const { channelId } = await params;

  return (
    <main>
      <Suspense fallback={<ChannelProfileSkeleton />}>
        <ChannelProfileFetcher channelId={channelId} />
      </Suspense>
      <section className={videoListStyle.section}>
        <h2 className={videoListStyle.title}>업로드한 동영상</h2>
        <Suspense fallback={<VideoListSkeleton />}>
          <ChannelVideoListFetcher channelId={channelId} />
        </Suspense>
      </section>
    </main>
  );
}
