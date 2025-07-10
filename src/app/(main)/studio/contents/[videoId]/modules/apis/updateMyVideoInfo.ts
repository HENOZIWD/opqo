import { CONTENT_TYPE_APPLICATION_JSON } from '@/apis/constant';
import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface UpdateMyVideoInfoParams extends FetchParams, AuthenticationParams {
  id: string;
  title: string;
  description: string;
}

export async function updateMyVideoInfo({
  id,
  title,
  description,
  accessToken,
  controller,
}: UpdateMyVideoInfoParams) {
  return fetchInstance.patch<void>(
    `studio/video/${id}`,
    {
      json: {
        title,
        description,
      },
      headers: {
        'Authorization': accessTokenToBearer(accessToken),
        'Content-Type': CONTENT_TYPE_APPLICATION_JSON,
      },
      signal: controller.signal,
    },
  );
}
