import Thumbnail from '@/components/video/thumbnail';
import { watchHistoryCardStyle } from '../styles/watchHistoryCardStyle.css';
import ChannelImage from '@/components/channel/channelImage';
import Link from 'next/link';

interface WatchHistoryCardProps {
  watchProgress: number;
  video: {
    id: string;
    title: string;
    duration: number;
    user: {
      id: string;
      name: string;
      picture: string;
    };
  };
};

export default function WatchHistoryCard({
  watchProgress,
  video,
}: WatchHistoryCardProps) {
  return (
    <div className={watchHistoryCardStyle.container}>
      <Link
        className={watchHistoryCardStyle.thumbnail}
        href={`/video/${video.id}`}
      >
        <Thumbnail
          videoId={video.id}
          videoTitle={video.title}
          duration={video.duration}
          watchProgress={watchProgress}
        />
      </Link>
      <div className={watchHistoryCardStyle.info}>
        <Link
          className={watchHistoryCardStyle.title}
          href={`/video/${video.id}`}
        >
          {video.title}
        </Link>
        <div className={watchHistoryCardStyle.channel}>
          <div className={watchHistoryCardStyle.channelImage}>
            <ChannelImage
              channelName={video.user.name}
              url={video.user.picture}
            />
          </div>
          <Link href={`/channel/${video.user.id}`}>{video.user.name}</Link>
        </div>
      </div>
    </div>
  );
}
