import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface GetMyChannelInfoParams extends AuthenticationParams { }
interface GetMyChannelInfoResponse {
  id: string;
  name: string;
  description: string;
  createdDate: string;
}

export async function getMyChannelInfo({ accessToken }: GetMyChannelInfoParams) {
  return fetchInstance.get<GetMyChannelInfoResponse>(
    'channels/me',
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}
