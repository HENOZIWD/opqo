import VideoCard from '@/components/video/videoCard';
import { videoListStyle } from '@/styles/video/videoListStyle.css';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { getChannelVideoList } from '../apis/getChannelVideoList';
import { getAccessTokenCookie } from '@/serverActions/token';
import LiveCard from './liveCard';

interface ChannelVideoListFetcherProps { channelId: string }

export default async function ChannelVideoListFetcher({ channelId }: ChannelVideoListFetcherProps) {
  const accessToken = (await getAccessTokenCookie()) ?? null;
  const { data } = await fetchHandlerWithServerComponent(() => getChannelVideoList({
    channelId,
    accessToken,
  }));

  if (!data) {
    return <div className={videoListStyle.fallback}>동영상 목록을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <ul className={videoListStyle.list}>
      {data.streamingInfo.isStreaming
        ? (
          <li
            className={videoListStyle.card}
            key="liveStreaming"
          >
            <LiveCard
              channelId={data.streamingInfo.userId}
              title={data.streamingInfo.title}
              viewerCount={data.streamingInfo.viewerCount}
            />
          </li>
        )
        : null}
      {data.videoList.length > 0
        ? data.videoList.map(({
          id,
          title,
          createdDate,
          duration,
          watchProgress,
        }) => (
          <li
            className={videoListStyle.card}
            key={id}
          >
            <VideoCard
              videoId={id}
              videoTitle={title}
              createdDate={createdDate}
              videoDuration={duration}
              watchProgress={watchProgress}
            />
          </li>
        ))
        : (
          <li className={videoListStyle.fallback}>업로드 된 동영상이 없습니다.</li>
        )}
    </ul>
  );
}
