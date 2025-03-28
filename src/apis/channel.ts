import { fetchInstanceWithCredentials } from './instance';
import { FetchParams } from './type';

interface createChannelParams extends FetchParams {
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
}: createChannelParams) {
  const form = new FormData();

  form.append('channel', new Blob([JSON.stringify({
    name: json.name,
    description: json.description,
  })], { type: 'application/json' }));

  return fetchInstanceWithCredentials.post<void>('/channels', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    signal: controller.signal,
  });
}

interface selectChannelParams extends FetchParams { channelId: string | null }
interface selectChannelResponse { accessToken: string }

export async function selectChannel({
  channelId,
  controller,
}: selectChannelParams) {
  return fetchInstanceWithCredentials.put<selectChannelResponse>(
    `/token`,
    { channelId },
    { signal: controller.signal },
  );
}

interface getChannelInfoResponse {
  id: string;
  name: string;
  description: string;
  createdDate: string;
}

export async function getChannelInfo({ controller }: FetchParams) {
  return fetchInstanceWithCredentials.get<getChannelInfoResponse>('/channels/me', { signal: controller.signal });
}
