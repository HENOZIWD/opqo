import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface GetMyVideoListParams extends AuthenticationParams { }
interface GetMyVideoListResponse {
  id: string;
  title: string;
  status: string;
  createdDate: string;
}

export async function getMyVideoList({ accessToken }: GetMyVideoListParams) {
  return fetchInstance.get<GetMyVideoListResponse[]>(
    'channels/me/videos',
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}
