import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { CONTENT_TYPE_APPLICATION_JSON } from '@/utils/constant';
import { accessTokenToBearer } from '@/utils/token';

interface SelectChannelParams extends FetchParams, AuthenticationParams { channelId: string | null }
interface SelectChannelResponse { accessToken: string }

export async function selectChannel({
  channelId,
  controller,
  accessToken,
}: SelectChannelParams) {
  return fetchInstance.put<SelectChannelResponse>(
    `token`,
    {
      json: { channelId },
      headers: {
        'Authorization': accessTokenToBearer(accessToken),
        'Content-Type': CONTENT_TYPE_APPLICATION_JSON,
      },
      signal: controller.signal,
      credentials: 'include',
    },
  );
}
