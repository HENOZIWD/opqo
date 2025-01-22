import { CreateChannelContent } from '@/utils/type';
import axios from 'axios';

const mockInstance = axios.create({
  baseURL: '/mockApi',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export async function createChannel(data: CreateChannelContent) {
  return mockInstance.post('/createChannel', data);
}
