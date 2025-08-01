import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface DeleteWatchHistoryParams extends FetchParams, AuthenticationParams { videoId: string }

export async function deleteWatchHistory({
  videoId,
  accessToken,
  controller,
}: DeleteWatchHistoryParams) {
  return fetchInstance.delete<void>(
    `history/${videoId}`,
    {
      headers: { Authorization: accessTokenToBearer(accessToken) },
      signal: controller.signal,
    },
  );
}
