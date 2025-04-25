import styles from './style.module.css';
import Link from 'next/link';
import ChannelImage from '../channelImage/component';
import Thumbnail from '../thumbnail/component';
import { formatDateString } from '@/utils/date';
import { numberToTime } from '@/utils/time';

interface VideoCardProps {
  videoId: string;
  videoDuration: number;
  videoTitle: string;
  createdDate: string;
  channelInfo?: {
    id: string;
    name: string;
  };
}

export default function VideoCard({
  videoId,
  videoDuration,
  videoTitle,
  createdDate,
  channelInfo,
}: VideoCardProps) {
  return (
    <article className={styles.container}>
      <Link
        href={`/video/${videoId}`}
        prefetch={false}
      >
        <div className={styles.thumbnailWrapper}>
          <Thumbnail
            videoId={videoId}
            videoTitle={videoTitle}
          />
          <div className={styles.videoDuration}>{numberToTime(videoDuration)}</div>
        </div>
      </Link>
      <div className={styles.videoCardInfo}>
        {channelInfo
          ? (
            <div className={styles.channelImage}>
              <ChannelImage
                channelId={channelInfo.id}
                channelName={channelInfo.name}
              />
            </div>
          )
          : null}
        <div className={styles.infoWrapper}>
          <Link
            href={`/video/${videoId}`}
            prefetch={false}
          >
            <h3 className={styles.videoTitle}>{videoTitle}</h3>
          </Link>
          {channelInfo
            ? (
              <Link href={`/channel/${channelInfo.id}`}>
                <div className={styles.channelName}>
                  {channelInfo.name}
                </div>
              </Link>
            )
            : null}
          <div className={styles.uploadDate}>{formatDateString(createdDate)}</div>
        </div>
      </div>
    </article>
  );
}
