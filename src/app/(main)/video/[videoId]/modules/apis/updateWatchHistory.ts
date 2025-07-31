import { CONTENT_TYPE_APPLICATION_JSON } from '@/apis/constant';
import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface UpdateWatchHistoryParams extends FetchParams, AuthenticationParams {
  videoId: string;
  watchProgress: number;
}

export async function updateWatchHistory({
  videoId,
  watchProgress,
  accessToken,
  controller,
}: UpdateWatchHistoryParams) {
  return fetchInstance.post(`history/${videoId}`, {
    json: { watchProgress: Math.floor(watchProgress) },
    headers: {
      'Authorization': accessTokenToBearer(accessToken),
      'Content-Type': CONTENT_TYPE_APPLICATION_JSON,
    },
    signal: controller.signal,
  });
}
