import axios from 'axios';
import { setTokenRefreshInterceptor } from './interceptor';

export const fetchInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

setTokenRefreshInterceptor(fetchInstance);
