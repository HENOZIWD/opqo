import { fetchInstance } from '@/apis/instance';
import { FETCH_CACHE_POLICY } from '@/apis/constant';
import { AuthenticationParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface GetVideoListParams extends AuthenticationParams {}
interface GetVideoListResponse {
  id: string;
  title: string;
  createdDate: string;
  duration: number;
  channel: {
    id: string;
    name: string;
    picture: string;
  };
  watchProgress?: number;
}

export async function getVideoList({ accessToken }: GetVideoListParams) {
  return fetchInstance.get<GetVideoListResponse[]>(
    `videoList`,
    {
      headers: { Authorization: accessTokenToBearer(accessToken) },
      ...FETCH_CACHE_POLICY,
    },
  );
}
