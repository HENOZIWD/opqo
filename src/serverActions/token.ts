'use server';

import { parseJwt } from '@/utils/token';
import { cookies } from 'next/headers';

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
    name: 'accessToken',
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

  return cookie.get('accessToken')?.value;
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

export async function deleteAccessTokenCookie() {
  const cookie = await cookies();

  cookie.delete('accessToken');
}
