import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface GetMyChannelListParams extends AuthenticationParams { }
interface GetMyChannelListResponse {
  id: string;
  name: string;
}

export async function getMyChannelList({ accessToken }: GetMyChannelListParams) {
  return fetchInstance.get<GetMyChannelListResponse[]>(
    'users/me/channels',
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}
