import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface UploadVideoContentParams extends FetchParams, AuthenticationParams {
  thumbnailImage: Blob;
  videoId: string;
  title: string;
  description: string;
}

export async function uploadVideoContent({
  thumbnailImage,
  videoId,
  title,
  description,
  controller,
  accessToken,
}: UploadVideoContentParams) {
  const formData = new FormData();

  formData.append('thumbnailImage', thumbnailImage);
  formData.append('title', title);
  formData.append('description', description);

  return fetchInstance.post<void>(`uploadVideo/${videoId}`, {
    body: formData,
    headers: { Authorization: accessTokenToBearer(accessToken) },
    signal: controller.signal,
  });
}
