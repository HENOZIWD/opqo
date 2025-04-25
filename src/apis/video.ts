import { accessTokenToBearer } from '@/utils/token';
import { fetchInstance } from './instance';
import { AuthenticationParams, FetchParams } from './type';

interface CreateVideoMetadataParams extends FetchParams, AuthenticationParams {
  hash: string;
  width: number;
  height: number;
  duration: number;
  extension: string;
  size: number;
}
interface CreateVideoMetadataResponse { videoId: string }

export async function createVideoMetadata({
  hash,
  width,
  height,
  duration,
  extension,
  size,
  controller,
  accessToken,
}: CreateVideoMetadataParams) {
  return fetchInstance.post<CreateVideoMetadataResponse>('/videos', {
    hash,
    width,
    height,
    duration,
    extension,
    size,
  }, {
    headers: { Authorization: accessTokenToBearer(accessToken) },
    signal: controller.signal,
  });
}

interface CheckVideoChunkExistParams extends FetchParams, AuthenticationParams {
  videoId: string;
  chunkIndex: number;
}

export async function checkVideoChunkExist({
  videoId,
  chunkIndex,
  controller,
  accessToken,
}: CheckVideoChunkExistParams) {
  return fetchInstance.head<void>(`/videos/${videoId}/chunks/${chunkIndex + 1}`, {
    headers: { Authorization: accessTokenToBearer(accessToken) },
    signal: controller.signal,
  });
}

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
  return fetchInstance.postForm<void>(
    `/videos/${videoId}/chunks/${chunkIndex + 1}`,
    { chunkFile },
    {
      headers: { Authorization: accessTokenToBearer(accessToken) },
      signal: controller.signal,
    },
  );
}

interface ReadyVideoUploadParams extends FetchParams, AuthenticationParams { videoId: string }

export async function readyVideoUpload({
  videoId,
  controller,
  accessToken,
}: ReadyVideoUploadParams) {
  return fetchInstance.post(`/videos/${videoId}/ready`, undefined, {
    headers: { Authorization: accessTokenToBearer(accessToken) },
    signal: controller.signal,
  });
}

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
  return fetchInstance.postForm<void>('/contents', {
    thumbnailImage,
    videoId,
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
  duration: number;
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
  channel: {
    id: string;
    name: string;
  };
}

export async function getVideoInfo({ videoId }: GetVideoInfoParams) {
  return fetchInstance.get<GetVideoInfoResponse>(`/contents/${videoId}`);
}

interface GetVideoListParams { category: string }
interface GetVideoListResponse {
  id: string;
  title: string;
  createdDate: string;
  duration: number;
  channel: {
    id: string;
    name: string;
  };
}

export async function getVideoList({ category }: GetVideoListParams) {
  return fetchInstance.get<GetVideoListResponse[]>(`/contents?view=${category}`);
}

interface GetMyVideoListParams extends AuthenticationParams { }
interface GetMyVideoListResponse {
  id: string;
  status: string;
  createdDate: string;
}

export async function getMyVideoList({ accessToken }: GetMyVideoListParams) {
  return fetchInstance.get<GetMyVideoListResponse[]>(
    '/channels/me/videos',
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}
