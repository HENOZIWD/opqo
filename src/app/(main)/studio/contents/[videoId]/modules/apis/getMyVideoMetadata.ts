import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface GetMyVideoMetadataParams extends AuthenticationParams { id: string }
interface GetMyVideoMetadataResponse {
  id: string;
  width: number;
  height: number;
  duration: number;
  size: number;
  extension: string;
  status: string;
  createdDate: string;
}

export async function getMyVideoMetadata({
  accessToken,
  id,
}: GetMyVideoMetadataParams) {
  return fetchInstance.get<GetMyVideoMetadataResponse>(
    `videos/${id}`,
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}
