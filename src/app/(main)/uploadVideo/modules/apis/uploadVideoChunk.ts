import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams, FetchParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface UploadVideoChunkParams extends FetchParams, AuthenticationParams {
  videoId: string;
  chunkIndex: number;
  chunkFile: Blob;
}

export async function uploadVideoChunk({
  videoId,
  chunkIndex,
  chunkFile,
  controller,
  accessToken,
}: UploadVideoChunkParams) {
  const formData = new FormData();

  formData.append('chunkFile', chunkFile);

  return fetchInstance.post<void>(
    `uploadVideo/${videoId}/chunk/${chunkIndex}`,
    {
      body: formData,
      headers: { Authorization: accessTokenToBearer(accessToken) },
      signal: controller.signal,
    },
  );
}
