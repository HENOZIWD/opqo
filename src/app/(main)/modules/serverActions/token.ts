import { getAccessTokenCookie } from '@/serverActions/token';
import { parseJwt } from '@/utils/token';

export async function getUserDataFromAccessToken() {
  const accessToken = await getAccessTokenCookie();

  if (!accessToken) {
    return null;
  }

  const decodedToken = parseJwt(accessToken);

  if (!decodedToken) {
    return null;
  }

  return decodedToken;
}
