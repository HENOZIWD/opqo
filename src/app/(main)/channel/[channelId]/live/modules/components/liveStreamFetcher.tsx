import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { getLiveStreamInfo } from '../apis/getLiveStreamInfo';
import VideoPlayer from '@/components/video/videoPlayer';
import { liveStreamPageStyle } from '../styles/liveStreamPageStyle.css';
import LiveStreamInfo from './liveStreamInfo';

interface LiveStreamFetcherProps { channelId: string }

export default async function LiveStreamFetcher({ channelId }: LiveStreamFetcherProps) {
  const { data } = await fetchHandlerWithServerComponent(() => getLiveStreamInfo({ channelId }));

  if (!data) {
    return <div>라이브 정보를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div>
      <div className={liveStreamPageStyle.live}>
        {data.isStreaming
          ? (
            <VideoPlayer
              source={`${process.env.NEXT_PUBLIC_CDN_VIDEO_URL}/live/${data.userId}/index.m3u8`}
              title={data.title}
              duration={0}
              hlsMode
              liveMode
            />
          )
          : <div className={liveStreamPageStyle.notStreaming}>현재 방송 중이 아닙니다.</div>}
      </div>
      <LiveStreamInfo data={data} />
    </div>
  );
}
