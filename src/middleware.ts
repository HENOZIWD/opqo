import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const privatePaths = [
    '/uploadVideo',
    '/studio',
    '/history',
  ];

  if (privatePaths.some((path) => request.nextUrl.pathname.startsWith(path))) { // 권한 필요
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!(await isAccessTokenValid(accessToken))) {
      return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_LOGIN_URL ?? '/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/uploadVideo',
    '/studio/:path*',
    '/history',
  ],
};

async function isAccessTokenValid(accessToken: string | undefined) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/verifyToken`, {
      method: 'HEAD',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 200) {
      return true;
    }

    return false;
  }
  catch {
    return false;
  }
}
