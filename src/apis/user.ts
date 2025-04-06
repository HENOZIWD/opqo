import { fetchInstance } from './instance';
import { FetchParams } from './type';

interface requestPhoneNumberVerificationCodeParams extends FetchParams { phoneNumber: string }
interface requestPhoneNumberVerificationCodeResponse { otp: string }

export async function requestPhoneNumberVerificationCode({
  phoneNumber,
  controller,
}: requestPhoneNumberVerificationCodeParams) {
  return fetchInstance.post<requestPhoneNumberVerificationCodeResponse>('/phone-auth', { phoneNumber }, { signal: controller.signal });
}

interface validatePhoneNumberVerificationCodeParams extends FetchParams {
  phoneNumber: string;
  authCode: string;
}
interface validatePhoneNumberVerificationCodeResponse { result: string }

export async function validatePhoneNumberVerificationCode({
  phoneNumber,
  authCode,
  controller,
}: validatePhoneNumberVerificationCodeParams) {
  return fetchInstance.post<validatePhoneNumberVerificationCodeResponse>('/phone-auth/verification', {
    phoneNumber,
    authCode,
  }, {
    signal: controller.signal,
    withCredentials: true,
  });
}

interface signupParams extends FetchParams {
  phoneNumber: string;
  password: string;
}

export async function signup({
  phoneNumber,
  password,
  controller,
}: signupParams) {
  return fetchInstance.post<void>('/users', {
    phoneNumber,
    password,
  }, { signal: controller.signal });
}

interface signinParams extends FetchParams {
  phoneNumber: string;
  password: string;
}
interface signinResponse { accessToken: string }

export async function signin({
  phoneNumber,
  password,
  controller,
}: signinParams) {
  return fetchInstance.post<signinResponse>('/token', {
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
