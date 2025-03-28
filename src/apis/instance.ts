import axios from 'axios';
import { setTokenInjectInterceptor, setTokenRefreshInterceptor } from './interceptor';

export const fetchInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchInstanceWithCredentials = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

setTokenInjectInterceptor(fetchInstanceWithCredentials);
setTokenRefreshInterceptor(fetchInstanceWithCredentials);
