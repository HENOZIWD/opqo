import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { getLiveStreamInfo } from '../apis/getLiveStreamInfo';
import VideoPlayer from '@/components/video/videoPlayer';
import { liveStreamPageStyle } from '../styles/liveStreamPageStyle.css';
import LiveStreamInfo from './liveStreamInfo';
import ChatRoom from './chatRoom';
import { getUserDataFromAccessToken } from '@/serverActions/token';

interface LiveStreamFetcherProps { channelId: string }

export default async function LiveStreamFetcher({ channelId }: LiveStreamFetcherProps) {
  const { data } = await fetchHandlerWithServerComponent(() => getLiveStreamInfo({ channelId }));
  const userData = await getUserDataFromAccessToken();

  if (!data) {
    return <div>라이브 정보를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className={liveStreamPageStyle.container}>
      <div className={liveStreamPageStyle.liveWrapper}>
        <div className={liveStreamPageStyle.live}>
          {data.isStreaming
            ? (
              <VideoPlayer
                source={`${process.env.NEXT_PUBLIC_CDN_VIDEO_URL}/live/${channelId}/index.m3u8`}
                thumbnail={`${process.env.NEXT_PUBLIC_CDN_VIDEO_URL}/live/${channelId}/thumbnail.webp`}
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
      <ChatRoom
        userData={userData}
        channelId={channelId}
      />
    </div>
  );
}
