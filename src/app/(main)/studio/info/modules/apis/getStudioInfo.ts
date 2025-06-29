import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface GetMyChannelInfoParams extends AuthenticationParams { }
interface GetMyChannelInfoResponse {
  id: string;
  email: string;
  name: string;
  description: string;
  createdDate: string;
  picture: string;
}

export async function getStudioInfo({ accessToken }: GetMyChannelInfoParams) {
  return fetchInstance.get<GetMyChannelInfoResponse>(
    'studio',
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}
