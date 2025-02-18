import Image from 'next/image';
import styles from './style.module.css';
import Link from 'next/link';
import ChannelImage from '../channelImage/component';

interface VideoCardProps {
  videoId: string;
  thumbnailUrl: string;
  videoDuration: string;
  videoTitle: string;
  uploadDate: string;
  channelInfo?: {
    channelId: string;
    channelImageUrl: string;
    channelName: string;
  };
}

export default function VideoCard({
  videoId,
  thumbnailUrl,
  videoDuration,
  videoTitle,
  uploadDate,
  channelInfo,
}: VideoCardProps) {
  return (
    <article className={styles.container}>
      <Link
        href={`/video/${videoId}`}
        prefetch={false}
      >
        <div className={styles.thumbnailWrapper}>
          <Image
            className={styles.thumbnail}
            src={thumbnailUrl || '/assets/lightgray.png'}
            alt={`${videoTitle} 썸네일`}
            fill
          />
          <div className={styles.videoDuration}>{videoDuration}</div>
        </div>
      </Link>
      <div className={styles.videoCardInfo}>
        {channelInfo
          ? (
            <div className={styles.channelImage}>
              <ChannelImage
                src={channelInfo.channelImageUrl}
                channelName={channelInfo.channelName}
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
              <Link href={`/channel/${channelInfo.channelId}`}>
                <div className={styles.channelName}>
                  {channelInfo.channelName}
                </div>
              </Link>
            )
            : null}
          <div className={styles.uploadDate}>{uploadDate}</div>
        </div>
      </div>
    </article>
  );
}
