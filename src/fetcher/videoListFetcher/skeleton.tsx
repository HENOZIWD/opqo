import styles from './style.module.css';

export default function VideoListSkeleton() {
  return (
    <div className={styles.videoList}>
      <div className={styles.videoCard}>
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonThumbnail} />
          <div className={styles.skeletonText} />
          <div className={styles.skeletonText} />
        </div>
      </div>
      <div className={styles.videoCard}>
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonThumbnail} />
          <div className={styles.skeletonText} />
          <div className={styles.skeletonText} />
        </div>
      </div>
      <div className={styles.videoCard}>
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonThumbnail} />
          <div className={styles.skeletonText} />
          <div className={styles.skeletonText} />
        </div>
      </div>
    </div>
  );
}
