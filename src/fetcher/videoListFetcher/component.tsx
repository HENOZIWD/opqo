import styles from './style.module.css';
import VideoCardFetcher from '../videoCardFetcher/component';
import { getVideoList } from '@/apis/video';
import { fetchHandlerWithServerComponent } from '@/utils/handler';

interface VideoListFetcherProps { category: string }

export default async function VideoListFetcher({ category }: VideoListFetcherProps) {
  const { data } = await fetchHandlerWithServerComponent(() => getVideoList({ category }));

  if (!data) {
    return <div className={styles.error}>동영상 목록을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <ul className={styles.videoList}>
      {data.map(({
        id,
        title,
        createdDate,
        channelId,
        channelName,
      }) => (
        <li
          key={id}
          className={styles.videoCard}
        >
          <VideoCardFetcher
            videoId={id}
            videoTitle={title}
            createdDate={createdDate}
            channelInfo={{
              channelId,
              channelName,
            }}
          />
        </li>
      ))}
    </ul>
  );
}
