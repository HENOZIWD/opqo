import { fetchInstanceWithCredentials } from './instance';
import { FetchParams } from './type';

interface prepareVideoUploadParams extends FetchParams {
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
}: prepareVideoUploadParams) {
  return fetchInstanceWithCredentials.post<void>('/videos', {
    hashValue,
    width,
    height,
    duration,
    extension,
  }, { signal: controller.signal });
}

interface checkVideoChunkExistParams extends FetchParams {
  videoHash: string;
  chunkIndex: number;
}

export async function checkVideoChunkExist({
  videoHash,
  chunkIndex,
  controller,
}: checkVideoChunkExistParams) {
  return fetchInstanceWithCredentials.head<void>(`/videos/${videoHash}/${chunkIndex + 1}`, { signal: controller.signal });
}

interface uploadVideoChunkParams extends FetchParams {
  videoHash: string;
  chunkIndex: number;
  chunkFile: Blob;
}

export async function uploadVideoChunk({
  videoHash,
  chunkIndex,
  chunkFile,
  controller,
}: uploadVideoChunkParams) {
  return fetchInstanceWithCredentials.post<void>(
    `/videos/${videoHash}/${chunkIndex + 1}`,
    { chunkFile },
    {
      signal: controller.signal,
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
}

interface uploadVideoContentParams extends FetchParams {
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
}: uploadVideoContentParams) {
  return fetchInstanceWithCredentials.postForm<void>('/contents', {
    thumbnailImage,
    hashValue,
    title,
    description,
  }, { signal: controller.signal });
}
