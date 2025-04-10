import { accessTokenToBearer } from '@/utils/token';
import { AuthenticationParams, FetchParams } from './type';
import { fetchInstance } from './instance';

interface CreateChannelParams extends FetchParams, AuthenticationParams {
  imageFile: Blob | null;
  json: {
    name: string;
    description: string;
  };
}

export async function createChannel({
  imageFile,
  json,
  controller,
  accessToken,
}: CreateChannelParams) {
  const form = new FormData();

  form.append('channel', new Blob([JSON.stringify({
    name: json.name,
    description: json.description,
  })], { type: 'application/json' }));

  return fetchInstance.post<void>('/channels', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': accessTokenToBearer(accessToken),
    },
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
    `/token`,
    { channelId },
    {
      headers: { Authorization: accessTokenToBearer(accessToken) },
      signal: controller.signal,
      withCredentials: true,
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
  return fetchInstance.get<GetChannelInfoResponse>(`/channels/${channelId}`);
}

interface GetMyChannelListParams extends AuthenticationParams { }
interface GetMyChannelListResponse {
  id: string;
  name: string;
}

export async function getMyChannelList({ accessToken }: GetMyChannelListParams) {
  return fetchInstance.get<GetMyChannelListResponse[]>(
    '/users/me/channels',
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}
