import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface UploadVideoContentParams extends FetchParams, AuthenticationParams {
  thumbnailImage: Blob;
  videoHash: string;
  title: string;
  description: string;
}

export async function uploadVideoContent({
  thumbnailImage,
  videoHash,
  title,
  description,
  controller,
  accessToken,
}: UploadVideoContentParams) {
  const formData = new FormData();

  formData.append('thumbnailImage', thumbnailImage);
  formData.append('videoHash', videoHash);
  formData.append('title', title);
  formData.append('description', description);

  return fetchInstance.post<void>('contents', {
    body: formData,
    headers: { Authorization: accessTokenToBearer(accessToken) },
    signal: controller.signal,
  });
}
