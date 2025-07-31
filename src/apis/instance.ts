import { tokenRefreshInterceptor } from './interceptor';
import ky from 'ky';

export const fetchInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 30000,
  hooks: { afterResponse: [tokenRefreshInterceptor] },
});
