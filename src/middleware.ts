import { NextRequest, NextResponse } from 'next/server';
import { parseJwt } from './utils/token';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/signin')) {
    const auth = getAuthority(request);

    if (auth) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/selectChannel')
    || request.nextUrl.pathname.startsWith('/createChannel')) { // 유저 권한 필요
    const auth = getAuthority(request);

    if (!auth) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/uploadVideo')) { // 채널 권한 필요
    const auth = getAuthority(request);

    if (!auth) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    if (auth === 'user') {
      return NextResponse.redirect(new URL('/selectChannel', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/signin',
    '/selectChannel',
    '/createChannel',
    '/uploadVideo',
  ],
};

function getAuthority(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) {
    return null;
  }

  const decodedToken = parseJwt(accessToken);

  if (decodedToken?.role === 'user') {
    return 'user';
  }

  if (decodedToken?.role === 'channel') {
    return 'channel';
  }

  return null;
}
