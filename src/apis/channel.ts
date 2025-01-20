import { CreateChannelContent } from '@/utils/type';
import axios from 'axios';

const mockInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export function createChannel(data: CreateChannelContent) {
  console.log(data);
  return mockInstance.post('/posts', {});
}
