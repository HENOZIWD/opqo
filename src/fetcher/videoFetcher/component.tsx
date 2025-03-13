import useSWRImmutable from 'swr/immutable';
import styles from './style.module.css';
import { VideoResponse } from '@/apis/getResponseType';
import { getFetcher } from '@/apis/getFetcher';
import VideoPlayer from '@/components/videoPlayer/component';
import ChannelImage from '@/components/channelImage/component';
import Link from 'next/link';

interface VideoFetcherProps { videoId: string }

export default function VideoFetcher({ videoId }: VideoFetcherProps) {
  const {
    data,
    error,
  } = useSWRImmutable<VideoResponse>(`/contents/${videoId}`, getFetcher, { errorRetryCount: 3 });

  if (error || !data) {
    return null;
  }

  return (
    <div>
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
    </div>
  );
}
