import styles from './style.module.css';
import ChannelSelectButton from '@/components/channelSelectButton/component';
import { getMyChannelList } from '@/apis/channel';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { getAccessTokenCookie } from '@/serverActions/token';

export default async function MyChannelListFetcher() {
  const accessToken = (await getAccessTokenCookie()) ?? null;
  const { data } = await fetchHandlerWithServerComponent(() => getMyChannelList({ accessToken }));

  if (!data) {
    return (
      <div className={styles.error}>채널 목록을 불러오지 못했습니다.</div>
    );
  }

  return (
    <ul className={styles.channelList}>
      {data.length > 0
        ? data.map(({
          id,
          name,
        }) => (
          <li key={id}>
            <ChannelSelectButton
              channelId={id}
              channelName={name}
              accessToken={accessToken}
            />
          </li>
        ))
        : (
          <div className={styles.noChannel}>
            채널이 없습니다. 채널을 생성해주세요.
          </div>
        )}
    </ul>
  );
}
