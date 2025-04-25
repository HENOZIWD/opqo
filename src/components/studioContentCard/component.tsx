import { formatDateString } from '@/utils/date';
import Thumbnail from '../thumbnail/component';
import styles from './style.module.css';

interface StudioContentCardProps {
  id: string;
  title: string;
  createdDate: string;
  status: string;
}

export default function StudioContentCard({
  id,
  title,
  createdDate,
  status,
}: StudioContentCardProps) {
  return (
    <article className={styles.container}>
      <div className={styles.thumbnail}>
        <Thumbnail
          videoId={id}
          videoTitle={title}
        />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.info}>
        <div className={styles.createdDate}>{formatDateString(createdDate)}</div>
        <div className={styles.status}>{status}</div>
      </div>
    </article>
  );
}
