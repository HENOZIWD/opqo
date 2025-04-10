import styles from './style.module.css';
import VideoPlayer from '@/components/videoPlayer/component';
import ChannelImage from '@/components/channelImage/component';
import Link from 'next/link';
import { getVideoInfo } from '@/apis/video';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { formatDateTimeString } from '@/utils/date';

interface VideoFetcherProps { videoId: string }

export default async function VideoFetcher({ videoId }: VideoFetcherProps) {
  const { data } = await fetchHandlerWithServerComponent(() => getVideoInfo({ videoId }));

  if (!data) {
    return <div>동영상을 불러오지 못했습니다.</div>;
  }

  return (
    <div>
      <div className={styles.videoWrapper}>
        <VideoPlayer
          source={`${process.env.NEXT_PUBLIC_CDN_VIDEO_URL}/${data.id}`}
          title={data.title}
          thumbnail={`${process.env.NEXT_PUBLIC_CDN_THUMBNAIL_URL}/${data.id}`}
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
          <div>{formatDateTimeString(data.createdDate)}</div>
          <div>{data.description}</div>
        </div>
      </div>
    </div>
  );
}
