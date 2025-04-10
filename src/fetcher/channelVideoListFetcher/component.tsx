import styles from './style.module.css';
import VideoCardFetcher from '../videoCardFetcher/component';
import { getChannelVideoList } from '@/apis/video';
import { fetchHandlerWithServerComponent } from '@/utils/handler';

interface ChannelVideoListFetcherProps { channelId: string }

export default async function ChannelVideoListFetcher({ channelId }: ChannelVideoListFetcherProps) {
  const { data } = await fetchHandlerWithServerComponent(() => getChannelVideoList({ channelId }));

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
        }) => (
          <li
            className={styles.videoCard}
            key={id}
          >
            <VideoCardFetcher
              videoId={id}
              videoTitle={title}
              createdDate={createdDate}
            />
          </li>
        ))
        : (
          <div>
            업로드한 동영상이 없습니다.
          </div>
        )}
    </ul>
  );
}
