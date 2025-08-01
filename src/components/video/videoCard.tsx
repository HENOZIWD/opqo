import Link from 'next/link';
import Thumbnail from './thumbnail';
import { formatDateString } from '@/utils/dateFormat';
import ChannelImage from '@/components/channel/channelImage';
import { videoCardStyle } from '@/styles/video/videoCardStyle.css';

interface VideoCardProps {
  videoId: string;
  videoDuration: number;
  videoTitle: string;
  createdDate: string;
  channelInfo?: {
    id: string;
    name: string;
    picture: string;
  };
}

export default function VideoCard({
  videoId,
  videoDuration,
  videoTitle,
  createdDate,
  channelInfo,
}: VideoCardProps) {
  return (
    <article className={videoCardStyle.container}>
      <Link
        href={`/video/${videoId}`}
        prefetch={false}
      >
        <div className={videoCardStyle.thumbnail}>
          <Thumbnail
            videoId={videoId}
            videoTitle={videoTitle}
            duration={videoDuration}
          />
        </div>
      </Link>
      <div className={videoCardStyle.infoSection}>
        {channelInfo
          ? (
            <div className={videoCardStyle.channelImage}>
              <ChannelImage
                channelName={channelInfo.name}
                url={channelInfo.picture}
              />
            </div>
          )
          : null}
        <div className={videoCardStyle.info}>
          <Link
            href={`/video/${videoId}`}
            prefetch={false}
          >
            <h3 className={videoCardStyle.title}>{videoTitle}</h3>
          </Link>
          {channelInfo
            ? (
              <Link href={`/channel/${channelInfo.id}`}>
                <div className={videoCardStyle.channelName}>
                  {channelInfo.name}
                </div>
              </Link>
            )
            : null}
          <div>{formatDateString(createdDate)}</div>
        </div>
      </div>
    </article>
  );
}
