import styles from './page.module.css';
import MyVideoInfoFetcher from '@/fetcher/myVIdeoInfoFetcher/component';

interface MyVideoInfoPageProps { params: Promise<{ videoId: string }> }

export default async function MyVideoInfoPage({ params }: MyVideoInfoPageProps) {
  const { videoId } = await params;

  return (
    <main>
      <h1 className={styles.title}>내 콘텐츠 정보</h1>
      <MyVideoInfoFetcher id={videoId} />
    </main>
  );
}
