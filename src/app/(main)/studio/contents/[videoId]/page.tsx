import { pageStyle } from '@/styles/common.css';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { Metadata } from 'next';
import MyVideoInfoFetcher from './modules/components/myVideoInfoFetcher';
import { getMyVideoInfo } from './modules/apis/getMyVideoInfo';
import { getAccessTokenCookie } from '@/serverActions/token';

interface MyVideoInfoPageProps { params: Promise<{ videoId: string }> }

export async function generateMetadata({ params }: MyVideoInfoPageProps): Promise<Metadata> {
  const { videoId } = await params;
  const accessToken = (await getAccessTokenCookie()) ?? null;

  const { data } = await fetchHandlerWithServerComponent(() => getMyVideoInfo({
    id: videoId,
    accessToken,
  }));

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
