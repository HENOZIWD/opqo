import { accessTokenToBearer } from '@/utils/token';
import { fetchInstance } from './instance';
import { AuthenticationParams, FetchParams } from './type';
import { CONTENT_TYPE_APPLICATION_JSON, FETCH_CACHE_POLICY } from '@/utils/constant';

interface CreateVideoMetadataParams extends FetchParams, AuthenticationParams {
  hash: string;
  width: number;
  height: number;
  duration: number;
  extension: string;
  size: number;
}

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
  return fetchInstance.post<void>('videos', {
    json: {
      hash,
      width,
      height,
      duration,
      extension,
      size,
    },
    headers: {
      'Authorization': accessTokenToBearer(accessToken),
      'Content-Type': CONTENT_TYPE_APPLICATION_JSON,
    },
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
  return fetchInstance.head(`videos/${videoHash}/chunks/${chunkIndex + 1}`, {
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
  const formData = new FormData();

  formData.append('chunkFile', chunkFile);

  return fetchInstance.post<void>(
    `videos/${videoHash}/chunks/${chunkIndex + 1}`,
    {
      body: formData,
      headers: { Authorization: accessTokenToBearer(accessToken) },
      signal: controller.signal,
    },
  );
}

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

interface GetChannelVideoListParams { channelId: string }
interface GetChannelVideoListResponse {
  id: string;
  title: string;
  createdDate: string;
  duration: number;
}

export async function getChannelVideoList({ channelId }: GetChannelVideoListParams) {
  return fetchInstance.get<GetChannelVideoListResponse[]>(`channels/${channelId}/contents`, FETCH_CACHE_POLICY);
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
  video: {
    width: number;
    height: number;
    duration: number;
  };
}

export async function getVideoInfo({ videoId }: GetVideoInfoParams) {
  return fetchInstance.get<GetVideoInfoResponse>(`contents/${videoId}`, FETCH_CACHE_POLICY);
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
  return fetchInstance.get<GetVideoListResponse[]>(`contents?view=${category}`, FETCH_CACHE_POLICY);
}

interface GetMyVideoListParams extends AuthenticationParams { }
interface GetMyVideoListResponse {
  id: string;
  title: string;
  status: string;
  createdDate: string;
}

export async function getMyVideoList({ accessToken }: GetMyVideoListParams) {
  return fetchInstance.get<GetMyVideoListResponse[]>(
    'channels/me/videos',
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}

interface GetMyVideoMetadataParams extends AuthenticationParams { id: string }
interface GetMyVideoMetadataResponse {
  id: string;
  width: number;
  height: number;
  duration: number;
  size: number;
  extension: string;
  status: string;
  createdDate: string;
}

export async function getMyVideoMetadata({
  accessToken,
  id,
}: GetMyVideoMetadataParams) {
  return fetchInstance.get<GetMyVideoMetadataResponse>(
    `videos/${id}`,
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}
