'use server';

import { getAccessTokenCookie } from '@/serverActions/token';
import { parseJwt } from '@/utils/token';
import { cookies } from 'next/headers';

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

export async function deleteAccessTokenCookie() {
  const cookie = await cookies();

  cookie.delete('accessToken');
}
