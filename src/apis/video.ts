import { accessTokenToBearer } from '@/utils/token';
import { fetchInstance } from './instance';
import { AuthenticationParams, FetchParams } from './type';

interface prepareVideoUploadParams extends FetchParams, AuthenticationParams {
  hashValue: string;
  width: number;
  height: number;
  duration: number;
  extension: string;
}

export async function prepareVideoUpload({
  hashValue,
  width,
  height,
  duration,
  extension,
  controller,
  accessToken,
}: prepareVideoUploadParams) {
  return fetchInstance.post<void>('/videos', {
    hashValue,
    width,
    height,
    duration,
    extension,
  }, {
    headers: { Authorization: accessTokenToBearer(accessToken) },
    signal: controller.signal,
  });
}

interface checkVideoChunkExistParams extends FetchParams, AuthenticationParams {
  videoHash: string;
  chunkIndex: number;
}

export async function checkVideoChunkExist({
  videoHash,
  chunkIndex,
  controller,
  accessToken,
}: checkVideoChunkExistParams) {
  return fetchInstance.head<void>(`/videos/${videoHash}/${chunkIndex + 1}`, {
    headers: { Authorization: accessTokenToBearer(accessToken) },
    signal: controller.signal,
  });
}

interface uploadVideoChunkParams extends FetchParams, AuthenticationParams {
  videoHash: string;
  chunkIndex: number;
  chunkFile: Blob;
}

export async function uploadVideoChunk({
  videoHash,
  chunkIndex,
  chunkFile,
  controller,
  accessToken,
}: uploadVideoChunkParams) {
  return fetchInstance.post<void>(
    `/videos/${videoHash}/${chunkIndex + 1}`,
    { chunkFile },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': accessTokenToBearer(accessToken),
      },
      signal: controller.signal,
    },
  );
}

interface uploadVideoContentParams extends FetchParams, AuthenticationParams {
  thumbnailImage: Blob;
  hashValue: string;
  title: string;
  description: string;
}

export async function uploadVideoContent({
  thumbnailImage,
  hashValue,
  title,
  description,
  controller,
  accessToken,
}: uploadVideoContentParams) {
  return fetchInstance.postForm<void>('/contents', {
    thumbnailImage,
    hashValue,
    title,
    description,
  }, {
    headers: { Authorization: accessTokenToBearer(accessToken) },
    signal: controller.signal,
  });
}
