import styles from './style.module.css';

export default function ChannelProfileSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.imageSkeleton} />
      <div className={styles.content}>
        <div className={styles.textSkeleton} />
        <div className={styles.textSkeleton} />
        <div className={styles.textSkeleton} />
      </div>
    </div>
  );
}
