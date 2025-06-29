import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface CheckVideoChunkExistParams extends FetchParams, AuthenticationParams {
  videoId: string;
  chunkIndex: number;
}

export async function checkVideoChunkExist({
  videoId,
  chunkIndex,
  controller,
  accessToken,
}: CheckVideoChunkExistParams) {
  return fetchInstance.head(`uploadVideo/${videoId}/chunk/${chunkIndex}`, {
    headers: { Authorization: accessTokenToBearer(accessToken) },
    signal: controller.signal,
  });
}
