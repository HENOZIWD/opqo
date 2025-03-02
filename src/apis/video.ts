import { setTokenRefreshInterceptor } from '@/utils/interceptor';
import { FetchParams } from '@/utils/type';
import axios from 'axios';

const videoInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const videoGETFetcher = (url: string) => videoInstance.get(url).then((res) => res.data);

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
  return videoInstance.post<void>('/videos', {
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
  return videoInstance.head<void>(`/videos/${videoHash}/${chunkIndex + 1}`, { signal: controller.signal });
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
  return videoInstance.post<void>(
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
  return videoInstance.postForm<void>('/contents', {
    thumbnailImage,
    hashValue,
    title,
    description,
  }, { signal: controller.signal });
}

setTokenRefreshInterceptor(videoInstance);
