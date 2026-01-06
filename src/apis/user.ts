import { fetchInstance } from './instance';

interface RefreshTokenResponse { accessToken: string }

export async function refreshToken() {
  return fetchInstance.post<RefreshTokenResponse>(
    'refreshToken',
    { credentials: 'include' },
  );
}
