import { numberToTime } from '@/utils/time';
import Thumbnail from '../thumbnail/component';
import styles from './style.module.css';
import { numberToFileSize } from '@/utils/convert';
import { formatDateTimeString } from '@/utils/date';

interface MyVideoInfoProps {
  id: string;
  width: number;
  height: number;
  duration: number;
  size: number;
  extension: string;
  status: string;
  createdDate: string;
  title: string;
  description: string;
}

export default function MyVideoInfo({
  id,
  width,
  height,
  duration,
  size,
  extension,
  status,
  createdDate,
  title,
  description,
}: MyVideoInfoProps) {
  return (
    <div className={styles.container}>
      <div className={styles.thumbnail}>
        <Thumbnail
          videoId={id}
          videoTitle={title}
        />
      </div>
      <div className={styles.info}>
        <section className={styles.category}>
          <h2 className={styles.categoryTitle}>동영상 제목</h2>
          <p className={styles.title}>{title}</p>
        </section>
        <section className={styles.category}>
          <h2 className={styles.categoryTitle}>해상도</h2>
          <p>{`${width} X ${height}`}</p>
        </section>
        <section className={styles.category}>
          <h2 className={styles.categoryTitle}>동영상 길이</h2>
          <p>{numberToTime(duration)}</p>
        </section>
        <section className={styles.category}>
          <h2 className={styles.categoryTitle}>동영상 크기</h2>
          <p>{numberToFileSize(size)}</p>
        </section>
        <section className={styles.category}>
          <h2 className={styles.categoryTitle}>확장자</h2>
          <p>{extension}</p>
        </section>
        <section className={styles.category}>
          <h2 className={styles.categoryTitle}>상태</h2>
          <p>{status}</p>
        </section>
        <section className={styles.category}>
          <h2 className={styles.categoryTitle}>생성한 날짜</h2>
          <p>{formatDateTimeString(createdDate)}</p>
        </section>
        <section className={styles.category}>
          <h2 className={styles.categoryTitle}>동영상 설명</h2>
          <p>{description}</p>
        </section>
      </div>
    </div>
  );
}
