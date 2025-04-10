import { fetchInstance } from './instance';
import { FetchParams } from './type';

interface RequestVerificationCodeParams extends FetchParams { phoneNumber: string }

export async function requestVerificationCode({
  phoneNumber,
  controller,
}: RequestVerificationCodeParams) {
  return fetchInstance.post<void>('/phone-auth', { phoneNumber }, { signal: controller.signal });
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
  return fetchInstance.post<void>('/users', {
    phoneNumber,
    password,
    authCode,
  }, { signal: controller.signal });
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
  return fetchInstance.post<SigninResponse>('/token', {
    phoneNumber,
    password,
  }, {
    signal: controller.signal,
    withCredentials: true,
  });
}

export async function signout({ controller }: FetchParams) {
  return fetchInstance.delete<void>('/token', {
    signal: controller.signal,
    withCredentials: true,
  });
}
