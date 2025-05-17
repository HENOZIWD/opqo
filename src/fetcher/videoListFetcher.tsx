import { getVideoList } from '@/apis/video';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import VideoCard from '@/components/video/videoCard';
import { videoListStyle } from '@/styles/video.css';

interface VideoListFetcherProps { category: string }

export default async function VideoListFetcher({ category }: VideoListFetcherProps) {
  const { data } = await fetchHandlerWithServerComponent(() => getVideoList({ category }));

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
          channel,
        }) => (
          <li
            key={id}
            className={videoListStyle.card}
          >
            <VideoCard
              videoId={id}
              videoTitle={title}
              videoDuration={duration}
              createdDate={createdDate}
              channelInfo={channel}
            />
          </li>
        ))
        : <li className={videoListStyle.fallback}>업로드 된 동영상이 없습니다.</li>}
    </ul>
  );
}
