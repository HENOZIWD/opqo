import { FetchParams } from '@/utils/type';
import axios from 'axios';

const channelInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const channelGETFetcher = (url: string) => channelInstance.get(url).then((res) => res.data);

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
  return channelInstance.postForm<void>('/users/me/channels', {
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
  return channelInstance.post<selectChannelResponse>(`/users/me/token/channel/${channelId}`, undefined, { signal: controller.signal });
}
