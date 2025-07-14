import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface DeleteChannelParams extends FetchParams, AuthenticationParams {}

export async function deleteChannel({
  controller,
  accessToken,
}: DeleteChannelParams) {
  return fetchInstance.delete<void>('channel', {
    headers: { Authorization: accessTokenToBearer(accessToken) },
    signal: controller.signal,
  });
}
