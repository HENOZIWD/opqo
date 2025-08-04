'use client';

import Thumbnail from '@/components/video/thumbnail';
import { watchHistoryCardStyle } from '../styles/watchHistoryCardStyle.css';
import ChannelImage from '@/components/channel/channelImage';
import Link from 'next/link';
import { Cross1Icon } from '@radix-ui/react-icons';
import { WatchHistory } from '../utils/type';

interface WatchHistoryCardProps {
  data: WatchHistory;
  handleDeleteWatchHistory: () => void;
};

export default function WatchHistoryCard({
  data,
  handleDeleteWatchHistory,
}: WatchHistoryCardProps) {
  return (
    <div className={watchHistoryCardStyle.container}>
      <Link
        className={watchHistoryCardStyle.thumbnail}
        href={`/video/${data.video.id}`}
      >
        <Thumbnail
          videoId={data.video.id}
          videoTitle={data.video.title}
          duration={data.video.duration}
          watchProgress={data.watchProgress}
        />
      </Link>
      <div className={watchHistoryCardStyle.infoWrapper}>
        <div className={watchHistoryCardStyle.info}>
          <Link
            className={watchHistoryCardStyle.title}
            href={`/video/${data.video.id}`}
          >
            {data.video.title}
          </Link>
          <div className={watchHistoryCardStyle.channel}>
            <div className={watchHistoryCardStyle.channelImage}>
              <ChannelImage
                channelName={data.video.user.name}
                url={data.video.user.picture}
              />
            </div>
            <Link href={`/channel/${data.video.user.id}`}>{data.video.user.name}</Link>
          </div>
        </div>
        <button
          type="button"
          title="시청 기록 삭제"
          aria-label="시청 기록 삭제"
          className={watchHistoryCardStyle.deleteButton}
          onClick={handleDeleteWatchHistory}
        >
          <Cross1Icon />
        </button>
      </div>
    </div>
  );
}
