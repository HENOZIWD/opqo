import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/uploadVideo')
    || request.nextUrl.pathname.startsWith('/studio')) { // 권한 필요
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
