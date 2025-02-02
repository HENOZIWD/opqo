import { UploadVideoContent } from '@/utils/type';
import axios from 'axios';

const mockInstance = axios.create({
  baseURL: '/mockApi',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export async function uploadVideo(data: UploadVideoContent) {
  return mockInstance.post('/uploadVideo', data);
}
