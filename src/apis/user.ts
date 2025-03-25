import { fetchInstance, fetchInstanceWithCredentials } from './instance';
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
  return fetchInstanceWithCredentials.post<validatePhoneNumberVerificationCodeResponse>('/phone-auth/verification', {
    phoneNumber,
    authCode,
  }, { signal: controller.signal });
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
  return fetchInstanceWithCredentials.post<void>('/users', {
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
  return fetchInstanceWithCredentials.post<signinResponse>('/token', {
    phoneNumber,
    password,
  }, { signal: controller.signal });
}

export async function signout({ controller }: FetchParams) {
  return fetchInstanceWithCredentials.delete<void>('/token', { signal: controller.signal });
}
