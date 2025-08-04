import { fetchInstance } from '@/apis/instance';
import { FETCH_CACHE_POLICY } from '@/apis/constant';
import { AuthenticationParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface GetChannelVideoListParams extends AuthenticationParams { channelId: string }
interface GetChannelVideoListResponse {
  id: string;
  title: string;
  createdDate: string;
  duration: number;
  watchProgress?: number;
}

export async function getChannelVideoList({
  channelId,
  accessToken,
}: GetChannelVideoListParams) {
  return fetchInstance.get<GetChannelVideoListResponse[]>(
    `channel/${channelId}/videoList`,
    {
      headers: { Authorization: accessTokenToBearer(accessToken) },
      ...FETCH_CACHE_POLICY,
    },
  );
}
