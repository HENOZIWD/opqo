import ChannelImage from '@/components/channelImage/component';
import styles from './style.module.css';
import { getChannelInfo } from '@/apis/channel';
import { fetchHandlerWithServerComponent } from '@/utils/handler';

interface ChannelProfileFetcherProps { channelId: string }

export default async function ChannelProfileFetcher({ channelId }: ChannelProfileFetcherProps) {
  const { data } = await fetchHandlerWithServerComponent(() => getChannelInfo({ channelId }));

  if (!data) {
    return <div className={styles.error}>채널 정보를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.channelImage}>
        <ChannelImage
          channelId={data.id}
          channelName={data.name}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.channelName}>
          {data.name}
        </div>
        <div className={styles.description}>
          {data.description}
        </div>
        <div className={styles.created}>
          가입일
          {' '}
          {data.createdDate}
        </div>
      </div>
    </div>
  );
}
