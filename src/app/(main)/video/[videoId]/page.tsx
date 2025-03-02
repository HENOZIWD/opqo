'use client';

import ChannelImage from '@/components/channelImage/component';
import styles from './page.module.css';
import { useParams } from 'next/navigation';
import VideoPlayer from '@/components/videoPlayer/component';
import Link from 'next/link';
import useSWRImmutable from 'swr/immutable';
import { getFetcher } from '@/apis/getFetcher';
import { VideoResponse } from '@/apis/getResponseType';

export default function VideoPage() {
  const { videoId } = useParams<{ videoId: string }>();

  const { data } = useSWRImmutable<VideoResponse>(`/video/${videoId}`, getFetcher);

  if (!data) {
    return null;
  }

  return (
    <main>
      <div className={styles.videoWrapper}>
        <VideoPlayer
          source={`${process.env.NEXT_PUBLIC_CDN_VIDEO_URL}/${data.id}`}
          title={data.title}
        />
      </div>
      <div className={styles.contentSection}>
        <h1 className={styles.title}>
          {data.title}
        </h1>
        {data
          ? (
            <div className={styles.channelSection}>
              <div className={styles.channelImage}>
                <ChannelImage
                  channelId={data.channelId}
                  channelName={data.channelName}
                />
              </div>
              <Link
                className={styles.channelName}
                href={`/channel/${data.channelId}`}
              >
                {data.channelName}
              </Link>
            </div>
          )
          : null}
        <div className={styles.description}>
          <div>{data.uploadDate.toLocaleDateString()}</div>
          <div>{data.description}</div>
        </div>
      </div>
    </main>
  );
}
