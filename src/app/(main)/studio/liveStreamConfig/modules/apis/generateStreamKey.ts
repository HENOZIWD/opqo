import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface GenerateStreamKeyParams extends FetchParams, AuthenticationParams {}
interface GenerateStreamKeyResponse { streamKey: string }

export async function generateStreamKey({
  controller,
  accessToken,
}: GenerateStreamKeyParams) {
  return fetchInstance.post<GenerateStreamKeyResponse>('streamKey', {
    headers: { Authorization: accessTokenToBearer(accessToken) },
    signal: controller.signal,
  });
}
