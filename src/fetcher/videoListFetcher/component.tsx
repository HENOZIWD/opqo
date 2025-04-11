import styles from './style.module.css';
import { getVideoList } from '@/apis/video';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import VideoCard from '@/components/videoCard/component';

interface VideoListFetcherProps { category: string }

export default async function VideoListFetcher({ category }: VideoListFetcherProps) {
  const { data } = await fetchHandlerWithServerComponent(() => getVideoList({ category }));

  if (!data) {
    return <div className={styles.error}>동영상 목록을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <ul className={styles.videoList}>
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
            className={styles.videoCard}
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
        : <div>업로드 된 동영상이 없습니다.</div>}
    </ul>
  );
}
