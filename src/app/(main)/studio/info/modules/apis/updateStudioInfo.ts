import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { CONTENT_TYPE_APPLICATION_JSON } from '@/utils/constant';
import { accessTokenToBearer } from '@/utils/token';

interface UpdateStudioInfoParams extends FetchParams, AuthenticationParams {
  name?: string;
  description?: string;
}

export async function updateStudioInfo({
  controller,
  accessToken,
  name,
  description,
}: UpdateStudioInfoParams) {
  return fetchInstance.put<void>('studio', {
    json: {
      name,
      description,
    },
    headers: {
      'Authorization': accessTokenToBearer(accessToken),
      'Content-Type': CONTENT_TYPE_APPLICATION_JSON,
    },
    signal: controller.signal,
  });
}
