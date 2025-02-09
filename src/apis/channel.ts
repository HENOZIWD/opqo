import { CreateChannelContent } from '@/utils/type';
import axios from 'axios';

const mockInstance = axios.create({
  baseURL: '/mockApi',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export const channelGETFetcher = (url: string) => mockInstance.get(url).then((res) => res.data);

export async function createChannel(data: CreateChannelContent) {
  return mockInstance.post('/createChannel', data);
}

export async function selectChannel(channelId: string) {
  return mockInstance.post('/selectChannel', { id: channelId });
}
