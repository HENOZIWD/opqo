import { AccessToken } from './type';

export function parseJwt(token: string): AccessToken | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replaceAll('-', '+').replaceAll('_', '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

    return JSON.parse(jsonPayload);
  }
  catch {
    return null;
  }
}

export function accessTokenToBearer(token: string | null | undefined) {
  if (!token) {
    return undefined;
  }

  return `Bearer ${token}`;
}
