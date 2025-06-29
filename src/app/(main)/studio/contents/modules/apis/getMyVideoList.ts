import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface GetMyVideoListParams extends AuthenticationParams { }
interface GetMyVideoListResponse {
  id: string;
  title: string;
  createdDate: string;
  isUploaded: boolean;
}

export async function getMyVideoList({ accessToken }: GetMyVideoListParams) {
  return fetchInstance.get<GetMyVideoListResponse[]>(
    'studio/videoList',
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}
