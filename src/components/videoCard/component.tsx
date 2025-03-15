import Image from 'next/image';
import styles from './style.module.css';
import Link from 'next/link';
import ChannelImage from '../channelImage/component';

interface VideoCardProps {
  videoId: string;
  videoDuration: string;
  videoTitle: string;
  createdDate: string;
  channelInfo?: {
    channelId: string;
    channelName: string;
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
          <Image
            className={styles.thumbnail}
            src={`${process.env.NEXT_PUBLIC_CDN_THUMBNAIL_URL}/${videoId}`}
            alt={`${videoTitle} 썸네일`}
            fill
            sizes="640px"
          />
          <div className={styles.videoDuration}>{videoDuration}</div>
        </div>
      </Link>
      <div className={styles.videoCardInfo}>
        {channelInfo
          ? (
            <div className={styles.channelImage}>
              <ChannelImage
                channelId={channelInfo.channelId}
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
          <div className={styles.uploadDate}>{createdDate}</div>
        </div>
      </div>
    </article>
  );
}
