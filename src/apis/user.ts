import { fetchInstance } from './instance';
import { FetchParams } from './type';

interface RefreshTokenParams extends FetchParams { }
interface RefreshTokenResponse { accessToken: string }

export async function refreshToken({ controller }: RefreshTokenParams) {
  return fetchInstance.post<RefreshTokenResponse>(
    'token/refresh',
    {
      signal: controller.signal,
      credentials: 'include',
    },
  );
}
