import styles from './style.module.css';
import { getChannelVideoList } from '@/apis/video';
import { videoCardStyle, videoListStyle } from '@/app/common.css';
import VideoCard from '@/components/videoCard/component';
import { fetchHandlerWithServerComponent } from '@/utils/handler';

interface ChannelVideoListFetcherProps { channelId: string }

export default async function ChannelVideoListFetcher({ channelId }: ChannelVideoListFetcherProps) {
  const { data } = await fetchHandlerWithServerComponent(() => getChannelVideoList({ channelId }));

  if (!data) {
    return <div className={styles.error}>동영상 목록을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <ul className={videoListStyle}>
      {data.length > 0
        ? data.map(({
          id,
          title,
          createdDate,
          duration,
        }) => (
          <li
            className={videoCardStyle}
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
          <div>
            업로드 된 동영상이 없습니다.
          </div>
        )}
    </ul>
  );
}
