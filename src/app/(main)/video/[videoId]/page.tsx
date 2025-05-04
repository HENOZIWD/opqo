import { getVideoInfo } from '@/apis/video';
import VideoFetcher from '@/fetcher/videoFetcher';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { Metadata } from 'next';

interface VideoPageProps { params: Promise<{ videoId: string }> }

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { videoId } = await params;

  const { data } = await fetchHandlerWithServerComponent(() => getVideoInfo({ videoId }));

  return {
    title: `${data?.title}`,
    description: `${data?.description}`,
    openGraph: { images: [`${process.env.NEXT_PUBLIC_CDN_THUMBNAIL_URL}/${data?.id}`] },
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { videoId } = await params;

  return (
    <main>
      <VideoFetcher videoId={videoId} />
    </main>
  );
}
