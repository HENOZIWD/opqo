import { CONTENT_TYPE_APPLICATION_JSON } from '@/utils/constant';
import { fetchInstance } from './instance';
import { FetchParams } from './type';

interface RequestVerificationCodeParams extends FetchParams { phoneNumber: string }

export async function requestVerificationCode({
  phoneNumber,
  controller,
}: RequestVerificationCodeParams) {
  return fetchInstance.post<void>('phone-auth', {
    json: { phoneNumber },
    signal: controller.signal,
    headers: { 'Content-Type': CONTENT_TYPE_APPLICATION_JSON },
  });
}

interface SignupParams extends FetchParams {
  phoneNumber: string;
  password: string;
  authCode: string;
}

export async function signup({
  phoneNumber,
  password,
  authCode,
  controller,
}: SignupParams) {
  return fetchInstance.post<void>('users', {
    json: {
      phoneNumber,
      password,
      authCode,
    },
    signal: controller.signal,
    headers: { 'Content-Type': CONTENT_TYPE_APPLICATION_JSON },
  });
}

interface SigninParams extends FetchParams {
  phoneNumber: string;
  password: string;
}
interface SigninResponse { accessToken: string }

export async function signin({
  phoneNumber,
  password,
  controller,
}: SigninParams) {
  return fetchInstance.post<SigninResponse>('token', {
    json: {
      phoneNumber,
      password,
    },
    signal: controller.signal,
    credentials: 'include',
    headers: { 'Content-Type': CONTENT_TYPE_APPLICATION_JSON },
  });
}

export async function signout({ controller }: FetchParams) {
  return fetchInstance.post<void>(
    'token/expire',
    {
      signal: controller.signal,
      credentials: 'include',
    },
  );
}

interface RefreshTokenParams extends FetchParams { }
interface RefreshTokenResponse { accessToken: string }

export async function refreshToken({ controller }: RefreshTokenParams) {
  return fetchInstance.post<RefreshTokenResponse>(
    'token/refresh',
    {
      signal: controller.signal,
      credentials: 'include',
    },
  );
}
