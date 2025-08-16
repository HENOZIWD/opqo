import Link from 'next/link';
import ChannelImage from '@/components/channel/channelImage';
import { videoInfoStyle } from '../styles/videoInfoStyle.css';
import Date from '@/components/common/date';

interface VideoInfoProps {
  title: string;
  description: string;
  createdDate: string;
  channelId: string;
  channelName: string;
  channelImage: string;
}

export default function VideoInfo({
  title,
  description,
  createdDate,
  channelId,
  channelName,
  channelImage,
}: VideoInfoProps) {
  return (
    <div className={videoInfoStyle.container}>
      <h1 className={videoInfoStyle.title}>
        {title}
      </h1>
      <div className={videoInfoStyle.channelSection}>
        <div className={videoInfoStyle.channelImage}>
          <ChannelImage
            channelName={channelName}
            url={channelImage}
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
        <div>
          <Date
            dateStr={createdDate}
            type="time"
          />
        </div>
        <div>{description}</div>
      </div>
    </div>
  );
}
