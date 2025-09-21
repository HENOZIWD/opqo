import ChannelImage from '@/components/channel/channelImage';
import { liveStreamInfoStyle } from '../styles/liveStreamInfoStyle.css';
import { LiveStreamInfo as LiveStreamInfoType } from '../utils/type';
import Link from 'next/link';
import ElapsedTime from './elapsedTime';

interface LiveStreamInfoProps { data: LiveStreamInfoType }

export default function LiveStreamInfo({ data }: LiveStreamInfoProps) {
  return (
    <div className={liveStreamInfoStyle.container}>
      <h1 className={liveStreamInfoStyle.title}>{data.title}</h1>
      {data.isStreaming
        ? (
          <div className={liveStreamInfoStyle.info}>
            <ElapsedTime startTime={data.streamStartDate} />
            <div>
              {data.viewerCount}
              {' '}
              명 시청 중
            </div>
          </div>
        )
        : null}
      <div className={liveStreamInfoStyle.channel}>
        <div className={liveStreamInfoStyle.channelImage}>
          <ChannelImage
            channelName={data.user.name}
            url={data.user.picture}
          />
        </div>
        <Link
          href={`/channel/${data.userId}`}
          className={liveStreamInfoStyle.channelName}
        >
          {data.user.name}
        </Link>
      </div>
    </div>
  );
}
