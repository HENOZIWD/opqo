import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface CreateChannelParams extends FetchParams, AuthenticationParams {
  imageFile: Blob | null;
  name: string;
  description: string;
}

export async function createChannel({
  imageFile,
  name,
  description,
  controller,
  accessToken,
}: CreateChannelParams) {
  const formData = new FormData();

  if (imageFile) {
    formData.append('profileImage', imageFile);
  }
  formData.append('name', name);
  formData.append('description', description);

  return fetchInstance.post<void>('channels', {
    body: formData,
    headers: { Authorization: accessTokenToBearer(accessToken) },
    signal: controller.signal,
  });
}
