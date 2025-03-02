'use client';

import styles from './page.module.css';
import { channelGETFetcher } from '@/apis/channel';
import { useParams } from 'next/navigation';
import ChannelProfile from '@/components/channelProfile/component';
import VideoCard from '@/components/videoCard/component';
import useSWRImmutable from 'swr/immutable';
import { ChannelResponse, ChannelVideoCardResponse } from '@/utils/type';

export default function ChannelPage() {
  const { channelId } = useParams<{ channelId: string }>();

  const { data: channelData } = useSWRImmutable<ChannelResponse>(`/channel/${channelId}`, channelGETFetcher);
  const { data: videoListData } = useSWRImmutable<ChannelVideoCardResponse[]>(`/channel/${channelId}/videos`, channelGETFetcher);

  return (
    <main>
      {channelData
        ? (
          <ChannelProfile
            channelId={channelData.id}
            channelName={channelData.name}
            description={channelData.description}
            createdDate={channelData.createdDate}
          />
        )
        : null}
      <section>
        <h2 className={styles.sectionTitle}>업로드한 동영상</h2>
        <ul className={styles.videoList}>
          {videoListData
            ? videoListData.map(({
              id,
              duration,
              title,
              uploadDate,
            }) => (
              <li
                className={styles.videoCard}
                key={id}
              >
                <VideoCard
                  videoId={id}
                  videoTitle={title}
                  videoDuration={duration}
                  uploadDate={uploadDate}
                />
              </li>
            ))
            : null}
        </ul>
      </section>
    </main>
  );
}
