import Link from 'next/link';
import { formatDateTimeString } from '@/utils/date';
import ChannelImage from '@/components/channel/channelImage';
import { videoInfoStyle } from '../styles/videoInfoStyle.css';

interface VideoInfoProps {
  title: string;
  description: string;
  createdDate: string;
  channelId: string;
  channelName: string;
}

export default function VideoInfo({
  title,
  description,
  createdDate,
  channelId,
  channelName,
}: VideoInfoProps) {
  return (
    <div className={videoInfoStyle.container}>
      <h1 className={videoInfoStyle.title}>
        {title}
      </h1>
      <div className={videoInfoStyle.channelSection}>
        <div className={videoInfoStyle.channelImage}>
          <ChannelImage
            channelId={channelId}
            channelName={channelName}
          />
        </div>
        <Link
          className={videoInfoStyle.channelName}
          href={`/channel/${channelId}`}
        >
          {channelName}
        </Link>
      </div>
      <div className={videoInfoStyle.description}>
        <div>{formatDateTimeString(createdDate)}</div>
        <div>{description}</div>
      </div>
    </div>
  );
}
