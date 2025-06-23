import { formatDateString } from '@/utils/date';
import Link from 'next/link';
import { videoCardStyle } from '@/styles/video.css';
import Thumbnail from '@/components/video/thumbnail';
import { studioContentCardStyle } from '../styles/studioContentCardStyle.css';

interface StudioContentCardProps {
  id: string;
  title: string;
  createdDate: string;
  isUploaded: boolean;
}

export default function StudioContentCard({
  id,
  title,
  createdDate,
  isUploaded,
}: StudioContentCardProps) {
  return (
    <article className={videoCardStyle.container}>
      <div className={videoCardStyle.thumbnail}>
        <Thumbnail
          videoId={id}
          videoTitle={title}
        />
      </div>
      <Link href={`/studio/contents/${id}`}>
        <h2 className={videoCardStyle.title}>{title}</h2>
      </Link>
      <div className={studioContentCardStyle.info}>
        <div>{formatDateString(createdDate)}</div>
        <div>{isUploaded ? '업로드 완료' : '업로드 중'}</div>
      </div>
    </article>
  );
}
