import VideoCard from '@/components/video/videoCard';
import { videoListStyle } from '@/styles/video.css';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { getChannelVideoList } from '../apis/getChannelVideoList';

interface ChannelVideoListFetcherProps { channelId: string }

export default async function ChannelVideoListFetcher({ channelId }: ChannelVideoListFetcherProps) {
  const { data } = await fetchHandlerWithServerComponent(() => getChannelVideoList({ channelId }));

  if (!data) {
    return <div className={videoListStyle.fallback}>동영상 목록을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <ul className={videoListStyle.list}>
      {data.length > 0
        ? data.map(({
          id,
          title,
          createdDate,
          duration,
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
            />
          </li>
        ))
        : (
          <li className={videoListStyle.fallback}>업로드 된 동영상이 없습니다.</li>
        )}
    </ul>
  );
}
