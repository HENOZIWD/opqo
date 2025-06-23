import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface GetMyVideoInfoParams extends AuthenticationParams { id: string }
interface GetMyVideoInfoResponse {
  id: string;
  width: number;
  height: number;
  duration: number;
  size: number;
  extension: string;
  createdDate: string;
  title: string;
  description: string;
  isUploaded: boolean;
}

export async function getMyVideoInfo({
  accessToken,
  id,
}: GetMyVideoInfoParams) {
  return fetchInstance.get<GetMyVideoInfoResponse>(
    `studio/video/${id}`,
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}
