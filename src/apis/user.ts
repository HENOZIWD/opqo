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
  authToken: string;
}
interface validatePhoneNumberVerificationCodeResponse { result: string }

export async function validatePhoneNumberVerificationCode({
  phoneNumber,
  authCode,
  authToken,
  controller,
}: validatePhoneNumberVerificationCodeParams) {
  return fetchInstance.post<validatePhoneNumberVerificationCodeResponse>('/phone-auth/valid', {
    phoneNumber,
    authCode,
    authToken,
  }, { signal: controller.signal });
}

interface signupParams extends FetchParams {
  phoneNumber: string;
  password: string;
  authToken: string;
}

export async function signup({
  phoneNumber,
  password,
  authToken,
  controller,
}: signupParams) {
  return fetchInstance.post<void>('/users', {
    phoneNumber,
    password,
    authToken,
  }, { signal: controller.signal });
}

interface signinParams extends FetchParams {
  phoneNumber: string;
  password: string;
}

export async function signin({
  phoneNumber,
  password,
  controller,
}: signinParams) {
  return fetchInstanceWithCredentials.post<void>('/token/user', {
    phoneNumber,
    password,
  }, { signal: controller.signal });
}

export async function signout({ controller }: FetchParams) {
  return fetchInstanceWithCredentials.delete<void>('/token', { signal: controller.signal });
}

export async function validateAuth() {
  return fetchInstanceWithCredentials.head<void>('/channels/me');
}
