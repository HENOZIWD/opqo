import styles from './page.module.css';
import ChannelProfileFetcher from '@/fetcher/channelProfileFetcher/component';
import ChannelVideoListFetcher from '@/fetcher/channelVideoListFetcher/component';

export default async function ChannelPage({ params }: { params: Promise<{ channelId: string }> }) {
  const { channelId } = await params;

  return (
    <main>
      <ChannelProfileFetcher channelId={channelId} />
      <section>
        <h2 className={styles.sectionTitle}>업로드한 동영상</h2>
        <ChannelVideoListFetcher channelId={channelId} />
      </section>
    </main>
  );
}
