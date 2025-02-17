'use client';

import ChannelImage from '@/components/channelImage/component';
import styles from './page.module.css';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { videoGETFetcher } from '@/apis/video';
import { channelGETFetcher } from '@/apis/channel';
import VideoPlayer from '@/components/videoPlayer/component';
import Link from 'next/link';

export default function VideoPage() {
  const { videoId } = useParams<{ videoId: string }>();

  const { data: videoData } = useSWR(`/video/${videoId}`, videoGETFetcher);
  const { data: channelData } = useSWR(videoData ? `/channel/${videoData.channelId}` : null, channelGETFetcher);

  if (!videoData) {
    return null;
  }

  return (
    <main>
      <div className={styles.videoWrapper}>
        <VideoPlayer
          source={videoData.videoUrl}
          title={videoData.videoTitle}
        />
      </div>
      <div className={styles.contentSection}>
        <h1 className={styles.title}>
          {videoData.videoTitle}
        </h1>
        {channelData
          ? (
            <div className={styles.channelSection}>
              <div className={styles.channelImage}>
                <ChannelImage
                  src={channelData.channelImageUrl}
                  channelName={channelData.channelName}
                />
              </div>
              <Link
                className={styles.channelName}
                href={`/channel/${channelData.channelId}`}
              >
                {channelData.channelName}
              </Link>
            </div>
          )
          : null}
        <div className={styles.description}>
          <div>{videoData.uploadDate}</div>
          <div>{videoData.description}</div>
        </div>
      </div>
    </main>
  );
}
