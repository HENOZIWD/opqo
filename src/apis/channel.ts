import { accessTokenToBearer } from '@/utils/token';
import { AuthenticationParams, FetchParams } from './type';
import { fetchInstance } from './instance';
import { CONTENT_TYPE_APPLICATION_JSON, FETCH_CACHE_POLICY } from '@/utils/constant';

interface CreateChannelParams extends FetchParams, AuthenticationParams {
  imageFile: Blob | null;
  name: string;
  description: string;
}

export async function createChannel({
  imageFile,
  name,
  description,
  controller,
  accessToken,
}: CreateChannelParams) {
  const formData = new FormData();

  if (imageFile) {
    formData.append('profileImage', imageFile);
  }
  formData.append('name', name);
  formData.append('description', description);

  return fetchInstance.post<void>('channels', {
    body: formData,
    headers: { Authorization: accessTokenToBearer(accessToken) },
    signal: controller.signal,
  });
}

interface SelectChannelParams extends FetchParams, AuthenticationParams { channelId: string | null }
interface SelectChannelResponse { accessToken: string }

export async function selectChannel({
  channelId,
  controller,
  accessToken,
}: SelectChannelParams) {
  return fetchInstance.put<SelectChannelResponse>(
    `token`,
    {
      json: { channelId },
      headers: {
        'Authorization': accessTokenToBearer(accessToken),
        'Content-Type': CONTENT_TYPE_APPLICATION_JSON,
      },
      signal: controller.signal,
      credentials: 'include',
    },
  );
}

interface GetChannelInfoParams { channelId: string }
interface GetChannelInfoResponse {
  id: string;
  name: string;
  description: string;
  createdDate: string;
}

export async function getChannelInfo({ channelId }: GetChannelInfoParams) {
  return fetchInstance.get<GetChannelInfoResponse>(`channels/${channelId}`, FETCH_CACHE_POLICY);
}

interface GetMyChannelListParams extends AuthenticationParams { }
interface GetMyChannelListResponse {
  id: string;
  name: string;
}

export async function getMyChannelList({ accessToken }: GetMyChannelListParams) {
  return fetchInstance.get<GetMyChannelListResponse[]>(
    'users/me/channels',
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}

interface GetMyChannelInfoParams extends AuthenticationParams { }
interface GetMyChannelInfoResponse {
  id: string;
  name: string;
  description: string;
  createdDate: string;
}

export async function getMyChannelInfo({ accessToken }: GetMyChannelInfoParams) {
  return fetchInstance.get<GetMyChannelInfoResponse>(
    'channels/me',
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}
