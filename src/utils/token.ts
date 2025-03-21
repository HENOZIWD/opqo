import { AccessToken } from './type';

function parseJwt(token: string): AccessToken | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replaceAll('-', '+').replaceAll('_', '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

    return JSON.parse(jsonPayload);
  }
  catch (error: unknown) {
    return null;
  }
}

export function isValidToken(token: string | null) {
  if (!token) {
    return false;
  }

  const decodedToken = parseJwt(token);

  if (!decodedToken) {
    return false;
  }

  const currentTime = Date.now() / 1000;

  return decodedToken.exp > currentTime;
}

export function getChannelInfoFromJwt(token: string) {
  const decodedToken = parseJwt(token);

  if (!decodedToken) {
    return null;
  }

  return decodedToken;
}
