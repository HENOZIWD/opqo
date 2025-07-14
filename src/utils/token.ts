import jwt from 'jsonwebtoken';
import { AccessToken } from './type';

export function parseJwt(token: string): AccessToken | null {
  try {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

    if (!secret) {
      throw new Error('No secret');
    }

    const decodedToken = jwt.verify(token, secret);

    if (decodedToken && typeof decodedToken === 'object' && decodedToken !== null) {
      return decodedToken as AccessToken;
    }
    return null;
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
