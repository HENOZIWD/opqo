import { getAccessTokenCookie } from '@/serverActions/token';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { getWatchHistory } from '../apis/getWatchHistory';
import WatchHistoryList from './watchHistoryList';

export default async function WatchHistoryFetcher() {
  const accessToken = (await getAccessTokenCookie()) ?? null;
  const { data } = await fetchHandlerWithServerComponent(() => getWatchHistory({ accessToken }));

  if (!data) {
    return <div>error</div>;
  }

  return (
    <div>
      <WatchHistoryList data={data} />
    </div>
  );
}
