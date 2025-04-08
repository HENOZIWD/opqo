import { accessTokenToBearer } from '@/utils/token';
import { fetchInstance } from './instance';
import { AuthenticationParams, FetchParams } from './type';

interface PrepareVideoUploadParams extends FetchParams, AuthenticationParams {
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
}: PrepareVideoUploadParams) {
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

interface CheckVideoChunkExistParams extends FetchParams, AuthenticationParams {
  videoHash: string;
  chunkIndex: number;
}

export async function checkVideoChunkExist({
  videoHash,
  chunkIndex,
  controller,
  accessToken,
}: CheckVideoChunkExistParams) {
  return fetchInstance.head<void>(`/videos/${videoHash}/${chunkIndex + 1}`, {
    headers: { Authorization: accessTokenToBearer(accessToken) },
    signal: controller.signal,
  });
}

interface UploadVideoChunkParams extends FetchParams, AuthenticationParams {
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
}: UploadVideoChunkParams) {
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

interface UploadVideoContentParams extends FetchParams, AuthenticationParams {
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
}: UploadVideoContentParams) {
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

interface GetChannelVideoListParams { channelId: string }
interface GetChannelVideoListResponse {
  id: string;
  title: string;
  createdDate: string;
}

export async function getChannelVideoList({ channelId }: GetChannelVideoListParams) {
  return fetchInstance.get<GetChannelVideoListResponse[]>(`/channels/${channelId}/contents`);
}

interface GetVideoInfoParams { videoId: string }
interface GetVideoInfoResponse {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  channelId: string;
  channelName: string;
}

export async function getVideoInfo({ videoId }: GetVideoInfoParams) {
  return fetchInstance.get<GetVideoInfoResponse>(`/contents/${videoId}`);
}

interface GetVideoListParams { category: string }
interface GetVideoListResponse {
  id: string;
  title: string;
  createdDate: string;
  channelId: string;
  channelName: string;
}

export async function getVideoList({ category }: GetVideoListParams) {
  return fetchInstance.get<GetVideoListResponse[]>(`/contents?view=${category}`);
}
