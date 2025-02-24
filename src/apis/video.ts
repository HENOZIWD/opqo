import { setTokenRefreshInterceptor } from '@/utils/interceptor';
import { UploadVideoContent, VideoMetadata } from '@/utils/type';
import axios from 'axios';

const videoInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VIDEO_SERVER_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export const videoGETFetcher = (url: string) => videoInstance.get(url).then((res) => res.data);

export async function prepareVideoUpload(videoHash: string, videoMetadata: VideoMetadata) {
  return videoInstance.post('/videos', {
    fileHash: videoHash,
    ...videoMetadata,
  });
}

export async function checkVideoChunkExist(videoHash: string, chunkIndex: number) {
  return videoInstance.head(`videos/${videoHash}/${chunkIndex + 1}`);
}

export async function uploadVideoChunk(videoChunk: Blob, videoHash: string, chunkIndex: number) {
  return videoInstance.post(
    `/videos/${videoHash}/${chunkIndex + 1}`,
    { chunkFile: videoChunk },
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
}

export async function uploadVideoContent(videoHash: string, thumbnailData: Blob, videoContent: UploadVideoContent) {
  return videoInstance.post(`/videos/${videoHash}`);
}

setTokenRefreshInterceptor(videoInstance);
