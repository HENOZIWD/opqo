import Image from 'next/image';
import styles from './style.module.css';
import Link from 'next/link';

interface VideoCardProps {
  videoId: string;
  thumbnailUrl: string;
  videoDuration: string;
  videoTitle: string;
  uploadDate: string;
}

export default function VideoCard({
  videoId,
  thumbnailUrl,
  videoDuration,
  videoTitle,
  uploadDate,
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
      <Link
        href={`/video/${videoId}`}
        prefetch={false}
      >
        <h3 className={styles.videoTitle}>{videoTitle}</h3>
      </Link>
      <div className={styles.uploadDate}>{uploadDate}</div>
    </article>
  );
}
