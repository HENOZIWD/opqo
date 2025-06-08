import { getVideoInfo } from '@/apis/video';
import { pageStyle } from '@/styles/common.css';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { Metadata } from 'next';
import MyVideoInfoFetcher from './modules/components/myVideoInfoFetcher';

interface MyVideoInfoPageProps { params: Promise<{ videoId: string }> }

export async function generateMetadata({ params }: MyVideoInfoPageProps): Promise<Metadata> {
  const { videoId } = await params;

  const { data } = await fetchHandlerWithServerComponent(() => getVideoInfo({ videoId }));

  return { title: `${data?.title} 정보` };
}

export default async function MyVideoInfoPage({ params }: MyVideoInfoPageProps) {
  const { videoId } = await params;

  return (
    <main>
      <h1 className={pageStyle.pageTitle}>내 콘텐츠 정보</h1>
      <MyVideoInfoFetcher id={videoId} />
    </main>
  );
}
