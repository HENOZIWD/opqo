import MyVideoInfoFetcher from '@/fetcher/myVideoInfoFetcher';
import { pageStyle } from '@/styles/common.css';

interface MyVideoInfoPageProps { params: Promise<{ videoId: string }> }

export default async function MyVideoInfoPage({ params }: MyVideoInfoPageProps) {
  const { videoId } = await params;

  return (
    <main>
      <h1 className={pageStyle.pageTitle}>내 콘텐츠 정보</h1>
      <MyVideoInfoFetcher id={videoId} />
    </main>
  );
}
