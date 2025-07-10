import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface DeleteMyVideoParams extends FetchParams, AuthenticationParams { id: string }

export async function deleteMyVideo({
  id,
  accessToken,
  controller,
}: DeleteMyVideoParams) {
  return fetchInstance.delete<void>(
    `studio/video/${id}`,
    {
      headers: { Authorization: accessTokenToBearer(accessToken) },
      signal: controller.signal,
    },
  );
}
