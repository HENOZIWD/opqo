import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';
import { WatchHistoryListByDate } from '../utils/type';

interface GetWatchHistoryParams extends AuthenticationParams {}
type GetWatchHistoryResponse = WatchHistoryListByDate;

export async function getWatchHistory({ accessToken }: GetWatchHistoryParams) {
  return fetchInstance.get<GetWatchHistoryResponse>(
    'history',
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}
