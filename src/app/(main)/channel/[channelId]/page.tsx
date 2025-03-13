'use client';

import styles from './page.module.css';
import { useParams } from 'next/navigation';
import ChannelProfileFetcher from '@/fetcher/channelProfileFetcher/component';
import ChannelVideoListFetcher from '@/fetcher/channelVideoListFetcher/component';

export default function ChannelPage() {
  const { channelId } = useParams<{ channelId: string }>();

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
