'use client';

import styles from './page.module.css';
import useSWR from 'swr';
import { channelGETFetcher } from '@/apis/channel';
import { useParams } from 'next/navigation';
import ChannelProfile from '@/components/channelProfile/component';
import VideoCard from '@/components/videoCard/component';

export default function ChannelPage() {
  const { channelId } = useParams<{ channelId: string }>();

  const { data: channelData } = useSWR(`/channel/${channelId}`, channelGETFetcher);
  const { data: videoListData } = useSWR(`/channel/${channelId}/videos`, channelGETFetcher);

  return (
    <main>
      {channelData
        ? (
          <ChannelProfile
            channelImageUrl={channelData.channelImageUrl}
            channelName={channelData.channelName}
            description={channelData.description}
            created={channelData.created}
          />
        )
        : null}
      <h2 className={styles.section}>업로드한 동영상</h2>
      <ul className={styles.videoList}>
        {videoListData
          ? videoListData.data.map(({
            videoId,
            thumbnailUrl,
            videoDuration,
            videoTitle,
            uploadDate,
          }) => (
            <li
              className={styles.videoCard}
              key={videoId}
            >
              <VideoCard
                videoId={videoId}
                thumbnailUrl={thumbnailUrl}
                videoTitle={videoTitle}
                videoDuration={videoDuration}
                uploadDate={uploadDate}
              />
            </li>
          ))
          : null}
      </ul>
    </main>
  );
}
