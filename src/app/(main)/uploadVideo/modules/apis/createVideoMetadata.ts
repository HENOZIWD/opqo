import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { CONTENT_TYPE_APPLICATION_JSON } from '@/utils/constant';
import { accessTokenToBearer } from '@/utils/token';

interface CreateVideoMetadataParams extends FetchParams, AuthenticationParams {
  hash: string;
  width: number;
  height: number;
  duration: number;
  extension: string;
  size: number;
}

export async function createVideoMetadata({
  hash,
  width,
  height,
  duration,
  extension,
  size,
  controller,
  accessToken,
}: CreateVideoMetadataParams) {
  return fetchInstance.post<void>('videos', {
    json: {
      hash,
      width,
      height,
      duration,
      extension,
      size,
    },
    headers: {
      'Authorization': accessTokenToBearer(accessToken),
      'Content-Type': CONTENT_TYPE_APPLICATION_JSON,
    },
    signal: controller.signal,
  });
}
