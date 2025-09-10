import { CONTENT_TYPE_APPLICATION_JSON } from '@/apis/constant';
import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface ApplyLiveStreamConfigParams extends FetchParams, AuthenticationParams { title: string }

export async function applyLiveStreamConfig({
  title,
  accessToken,
  controller,
}: ApplyLiveStreamConfigParams) {
  return fetchInstance.post<void>('liveStreamConfig', {
    json: { title },
    headers: {
      'Authorization': accessTokenToBearer(accessToken),
      'Content-Type': CONTENT_TYPE_APPLICATION_JSON,
    },
    signal: controller.signal,
  });
}
