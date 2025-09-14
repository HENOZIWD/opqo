'use server';

import { parseJwt } from '@/utils/token';
import { cookies } from 'next/headers';

const ACCESS_TOKEN = 'accessToken';

interface SetAccessTokenCookieParams {
  accessToken: string;
  expUnixTimeStamp: number;
}

export async function setAccessTokenCookie({
  accessToken,
  expUnixTimeStamp,
}: SetAccessTokenCookieParams) {
  const cookie = await cookies();

  cookie.set({
    name: ACCESS_TOKEN,
    value: accessToken,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: true,
    expires: new Date(expUnixTimeStamp * 1000),
  });
}

export async function getAccessTokenCookie() {
  const cookie = await cookies();

  return cookie.get(ACCESS_TOKEN)?.value;
}

export async function deleteAccessTokenCookie() {
  const cookie = await cookies();

  cookie.delete(ACCESS_TOKEN);
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
