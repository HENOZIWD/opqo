import { getMyChannelList } from '@/apis/channel';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { getAccessTokenCookie } from '@/serverActions/token';
import ChannelSelectButton from '@/components/channel/channelSelectButton';
import { myChannelListStyle } from '@/styles/channel.css';

export default async function MyChannelListFetcher() {
  const accessToken = (await getAccessTokenCookie()) ?? null;
  const { data } = await fetchHandlerWithServerComponent(() => getMyChannelList({ accessToken }));

  if (!data) {
    return (
      <div className={myChannelListStyle.loadError}>채널 목록을 불러오지 못했습니다.</div>
    );
  }

  return (
    <ul className={myChannelListStyle.container}>
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
          <div className={myChannelListStyle.empty}>
            채널이 없습니다. 채널을 생성해주세요.
          </div>
        )}
    </ul>
  );
}
