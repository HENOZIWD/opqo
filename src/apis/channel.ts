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
  return fetchInstanceWithCredentials.postForm<void>('/users/me/channels', {
    imageFile,
    json,
  }, { signal: controller.signal });
}

interface selectChannelParams extends FetchParams { channelId: string }
interface selectChannelResponse { accessToken: string }

export async function selectChannel({
  channelId,
  controller,
}: selectChannelParams) {
  return fetchInstanceWithCredentials.post<selectChannelResponse>(
    `/token/channel`,
    { channelId },
    { signal: controller.signal },
  );
}
