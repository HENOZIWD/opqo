import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';
import { WatchHistory } from '../utils/type';

interface GetWatchHistoryParams extends AuthenticationParams {}
type GetWatchHistoryResponse = WatchHistory[];

export async function getWatchHistory({ accessToken }: GetWatchHistoryParams) {
  return fetchInstance.get<GetWatchHistoryResponse>(
    'history',
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}
