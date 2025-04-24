import { formatDateString } from '@/utils/date';
import ChannelImage from '../channelImage/component';
import styles from './style.module.css';

interface StudioInfoProps {
  id: string;
  name: string;
  description: string;
  createdDate: string;
}

export default function StudioInfo({
  id,
  name,
  description,
  createdDate,
}: StudioInfoProps) {
  return (
    <div className={styles.container}>
      <div className={styles.channelImage}>
        <ChannelImage
          channelId={id}
          channelName={name}
        />
      </div>
      <section className={styles.category}>
        <h2 className={styles.categoryTitle}>채널 이름</h2>
        <p className={styles.name}>{name}</p>
      </section>
      <section className={styles.category}>
        <h2 className={styles.categoryTitle}>채널 설명</h2>
        <p className={styles.categoryContent}>{description}</p>
      </section>
      <section className={styles.category}>
        <h2 className={styles.categoryTitle}>채널 개설일</h2>
        <p className={styles.categoryContent}>{formatDateString(createdDate)}</p>
      </section>
    </div>
  );
}
