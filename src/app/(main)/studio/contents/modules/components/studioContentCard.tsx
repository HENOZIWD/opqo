import { formatDateString } from '@/utils/date';
import Link from 'next/link';
import { videoCardStyle } from '@/styles/video.css';
import Thumbnail from '@/components/video/thumbnail';
import { studioContentCardStyle } from '../styles/studioContentCardStyle.css';

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
        <div>{status}</div>
      </div>
    </article>
  );
}
