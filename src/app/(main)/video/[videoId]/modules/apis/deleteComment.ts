import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface DeleteCommentParams extends FetchParams, AuthenticationParams { id: string }

export async function deleteComment({
  id,
  accessToken,
  controller,
}: DeleteCommentParams) {
  return fetchInstance.delete<void>(
    `comment/${id}`,
    {
      headers: { Authorization: accessTokenToBearer(accessToken) },
      signal: controller.signal,
    },
  );
}
