import { Metadata } from 'next';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { getLiveStreamInfo } from './modules/apis/getLiveStreamInfo';
import LiveStreamFetcher from './modules/components/liveStreamFetcher';

interface LivePageProps { params: Promise<{ channelId: string }> }

export async function generateMetadata({ params }: LivePageProps): Promise<Metadata> {
  const { channelId } = await params;

  const { data } = await fetchHandlerWithServerComponent(() => getLiveStreamInfo({ channelId }));

  return {
    title: `${data?.title}`,
    description: `${data?.user.name}의 라이브`,
    openGraph: { images: [`${data?.user.picture}`] },
  };
}

export default async function LivePage({ params }: LivePageProps) {
  const { channelId } = await params;

  return (
    <main>
      <LiveStreamFetcher channelId={channelId} />
    </main>
  );
}
