import { numberToTime } from '@/utils/time';
import Thumbnail from '../video/thumbnail';
import { numberToFileSize } from '@/utils/convert';
import { formatDateTimeString } from '@/utils/date';
import { myVideoInfoStyle } from '@/styles/studio.css';

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
    <div className={myVideoInfoStyle.container}>
      <div className={myVideoInfoStyle.thumbnail}>
        <Thumbnail
          videoId={id}
          videoTitle={title}
        />
      </div>
      <div className={myVideoInfoStyle.info}>
        <section className={myVideoInfoStyle.category}>
          <h2 className={myVideoInfoStyle.categoryTitle}>동영상 제목</h2>
          <p className={myVideoInfoStyle.title}>{title}</p>
        </section>
        <section className={myVideoInfoStyle.category}>
          <h2 className={myVideoInfoStyle.categoryTitle}>해상도</h2>
          <p>{`${width} X ${height}`}</p>
        </section>
        <section className={myVideoInfoStyle.category}>
          <h2 className={myVideoInfoStyle.categoryTitle}>동영상 길이</h2>
          <p>{numberToTime(duration)}</p>
        </section>
        <section className={myVideoInfoStyle.category}>
          <h2 className={myVideoInfoStyle.categoryTitle}>동영상 크기</h2>
          <p>{numberToFileSize(size)}</p>
        </section>
        <section className={myVideoInfoStyle.category}>
          <h2 className={myVideoInfoStyle.categoryTitle}>확장자</h2>
          <p>{extension}</p>
        </section>
        <section className={myVideoInfoStyle.category}>
          <h2 className={myVideoInfoStyle.categoryTitle}>상태</h2>
          <p>{status}</p>
        </section>
        <section className={myVideoInfoStyle.category}>
          <h2 className={myVideoInfoStyle.categoryTitle}>생성한 날짜</h2>
          <p>{formatDateTimeString(createdDate)}</p>
        </section>
        <section className={myVideoInfoStyle.category}>
          <h2 className={myVideoInfoStyle.categoryTitle}>동영상 설명</h2>
          <p>{description}</p>
        </section>
      </div>
    </div>
  );
}
