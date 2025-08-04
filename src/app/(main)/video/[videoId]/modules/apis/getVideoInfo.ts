import { fetchInstance } from '@/apis/instance';
import { FETCH_CACHE_POLICY } from '@/apis/constant';
import { AuthenticationParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface GetVideoInfoParams extends AuthenticationParams { videoId: string }
interface GetVideoInfoResponse {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  duration: number;
  channel: {
    id: string;
    name: string;
    picture: string;
  };
  watchProgress: number | null;
}

export async function getVideoInfo({
  accessToken,
  videoId,
}: GetVideoInfoParams) {
  return fetchInstance.get<GetVideoInfoResponse>(`video/${videoId}`, {
    headers: { Authorization: accessTokenToBearer(accessToken) },
    ...FETCH_CACHE_POLICY,
  });
}
