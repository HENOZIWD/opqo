import { SigninContent } from '@/utils/type';
import axios from 'axios';

const mockInstance = axios.create({
  baseURL: '/mockApi',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export async function signin(data: SigninContent) {
  return mockInstance.post('/signin', data);
}
