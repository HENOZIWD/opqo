import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface CheckVideoChunkExistParams extends FetchParams, AuthenticationParams {
  videoHash: string;
  chunkIndex: number;
}

export async function checkVideoChunkExist({
  videoHash,
  chunkIndex,
  controller,
  accessToken,
}: CheckVideoChunkExistParams) {
  return fetchInstance.head(`videos/${videoHash}/chunks/${chunkIndex + 1}`, {
    headers: { Authorization: accessTokenToBearer(accessToken) },
    signal: controller.signal,
  });
}
