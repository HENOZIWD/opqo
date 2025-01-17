import { SigninContent } from '@/utils/type';
import axios from 'axios';

const mockInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export async function signin(data: SigninContent) {
  console.log(data);
  return mockInstance.post('/posts', {});
}
