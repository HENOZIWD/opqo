import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { CONTENT_TYPE_APPLICATION_JSON } from '@/apis/constant';
import { accessTokenToBearer } from '@/utils/token';

interface CreateVideoMetadataParams extends FetchParams, AuthenticationParams {
  hash: string;
  width: number;
  height: number;
  duration: number;
  extension: string;
  size: number;
  totalChunkCount: number;
}
interface CreateVideoMetadataResponse { id: string }

export async function createVideoMetadata({
  hash,
  width,
  height,
  duration,
  extension,
  size,
  totalChunkCount,
  controller,
  accessToken,
}: CreateVideoMetadataParams) {
  return fetchInstance.post<CreateVideoMetadataResponse>('uploadVideo/metadata', {
    json: {
      hash,
      width,
      height,
      duration,
      extension,
      size,
      totalChunkCount,
    },
    headers: {
      'Authorization': accessTokenToBearer(accessToken),
      'Content-Type': CONTENT_TYPE_APPLICATION_JSON,
    },
    signal: controller.signal,
  });
}
