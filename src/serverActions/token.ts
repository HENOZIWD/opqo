'use server';

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
