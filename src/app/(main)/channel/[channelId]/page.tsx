import styles from './page.module.css';
import ChannelProfileFetcher from '@/fetcher/channelProfileFetcher/component';
import ChannelProfileSkeleton from '@/fetcher/channelProfileFetcher/skeleton';
import ChannelVideoListFetcher from '@/fetcher/channelVideoListFetcher/component';
import ChannelVideoListSkeleton from '@/fetcher/channelVideoListFetcher/skeleton';
import { Suspense } from 'react';

export default async function ChannelPage({ params }: { params: Promise<{ channelId: string }> }) {
  const { channelId } = await params;

  return (
    <main>
      <Suspense fallback={<ChannelProfileSkeleton />}>
        <ChannelProfileFetcher channelId={channelId} />
      </Suspense>
      <section>
        <h2 className={styles.sectionTitle}>업로드한 동영상</h2>
        <Suspense fallback={<ChannelVideoListSkeleton />}>
          <ChannelVideoListFetcher channelId={channelId} />
        </Suspense>
      </section>
    </main>
  );
}
