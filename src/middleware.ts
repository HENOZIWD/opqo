import { NextRequest, NextResponse } from 'next/server';
import { parseJwt } from './utils/token';
import { ROLE_CHANNEL, ROLE_USER } from './utils/constant';

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

  if (request.nextUrl.pathname.startsWith('/uploadVideo')
    || request.nextUrl.pathname.startsWith('/studio')) { // 채널 권한 필요
    const auth = getAuthority(request);

    if (!auth) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    if (auth === ROLE_USER) {
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
    '/studio/:path*',
  ],
};

function getAuthority(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) {
    return null;
  }

  const decodedToken = parseJwt(accessToken);

  if (decodedToken?.role === ROLE_USER) {
    return ROLE_USER;
  }

  if (decodedToken?.role === ROLE_CHANNEL) {
    return ROLE_CHANNEL;
  }

  return null;
}
