import { FETCH_CACHE_POLICY } from '@/apis/constant';
import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface GetWatchHistoryParams extends AuthenticationParams {}
interface GetWatchHistoryResponse {
  watchProgress: number;
  watchedDate: string;
  video: {
    id: string;
    title: string;
    duration: number;
    user: {
      id: string;
      name: string;
      picture: string;
    };
  };
}

export async function getWatchHistory({ accessToken }: GetWatchHistoryParams) {
  return fetchInstance.get<GetWatchHistoryResponse[]>('history', {
    headers: { Authorization: accessTokenToBearer(accessToken) },
    ...FETCH_CACHE_POLICY,
  });
}
