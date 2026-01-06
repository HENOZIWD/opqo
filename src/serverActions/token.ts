'use server';

import { parseJwt } from '@/utils/token';
import { cookies } from 'next/headers';

const ACCESS_TOKEN = 'accessToken';

export async function getAccessTokenCookie() {
  const cookie = await cookies();

  return cookie.get(ACCESS_TOKEN)?.value;
}

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
