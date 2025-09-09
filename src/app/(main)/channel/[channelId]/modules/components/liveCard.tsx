import { thumbnailStyle } from '@/styles/video/thumbnailStyle.css';
import { videoCardStyle } from '@/styles/video/videoCardStyle.css';
import Image from 'next/image';
import Link from 'next/link';
import { liveCardStyle } from '../styles/liveCardStyle.css';

interface LiveCardProps {
  channelId: string;
  title: string;
}

export default function LiveCard({
  channelId,
  title,
}: LiveCardProps) {
  return (
    <article className={videoCardStyle.container}>
      <Link
        href={`/channel/${channelId}/live`}
        prefetch={false}
      >
        <div className={videoCardStyle.thumbnail}>
          <div className={thumbnailStyle.container}>
            <Image
              className={thumbnailStyle.image}
              src={`${process.env.NEXT_PUBLIC_CDN_VIDEO_URL}/live/${channelId}/thumbnail.webp`}
              alt="라이브 스트리밍 썸네일"
              fill
              sizes="640px"
            />
            <div className={liveCardStyle.liveTag}>LIVE</div>
          </div>
        </div>
      </Link>
      <div className={videoCardStyle.infoSection}>
        <div className={videoCardStyle.info}>
          <Link
            href={`/channel/${channelId}/live`}
            prefetch={false}
          >
            <h3 className={videoCardStyle.title}>{title}</h3>
          </Link>
        </div>
      </div>
    </article>
  );
}
