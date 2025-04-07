import { accessTokenToBearer } from '@/utils/token';
import { AuthenticationParams, FetchParams } from './type';
import { fetchInstance } from './instance';

interface createChannelParams extends FetchParams, AuthenticationParams {
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
}: createChannelParams) {
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

interface selectChannelParams extends FetchParams, AuthenticationParams { channelId: string | null }
interface selectChannelResponse { accessToken: string }

export async function selectChannel({
  channelId,
  controller,
  accessToken,
}: selectChannelParams) {
  return fetchInstance.put<selectChannelResponse>(
    `/token`,
    { channelId },
    {
      headers: { Authorization: accessTokenToBearer(accessToken) },
      signal: controller.signal,
      withCredentials: true,
    },
  );
}
