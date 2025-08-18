import { CONTENT_TYPE_APPLICATION_JSON } from '@/apis/constant';
import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface UploadCommentParams extends FetchParams, AuthenticationParams {
  videoId: string;
  comment: string;
}

export async function uploadComment({
  videoId,
  comment,
  controller,
  accessToken,
}: UploadCommentParams) {
  return fetchInstance.post(`comment/${videoId}`, {
    json: { comment },
    headers: {
      'Authorization': accessTokenToBearer(accessToken),
      'Content-Type': CONTENT_TYPE_APPLICATION_JSON,
    },
    signal: controller.signal,
  });
}
