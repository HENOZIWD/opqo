import { fetchInstance } from './instance';
import { FetchParams } from './type';

interface RequestPhoneNumberVerificationCodeParams extends FetchParams { phoneNumber: string }
interface RequestPhoneNumberVerificationCodeResponse { otp: string }

export async function requestPhoneNumberVerificationCode({
  phoneNumber,
  controller,
}: RequestPhoneNumberVerificationCodeParams) {
  return fetchInstance.post<RequestPhoneNumberVerificationCodeResponse>('/phone-auth', { phoneNumber }, { signal: controller.signal });
}

interface ValidatePhoneNumberVerificationCodeParams extends FetchParams {
  phoneNumber: string;
  authCode: string;
}
interface ValidatePhoneNumberVerificationCodeResponse { result: string }

export async function validatePhoneNumberVerificationCode({
  phoneNumber,
  authCode,
  controller,
}: ValidatePhoneNumberVerificationCodeParams) {
  return fetchInstance.post<ValidatePhoneNumberVerificationCodeResponse>('/phone-auth/verification', {
    phoneNumber,
    authCode,
  }, {
    signal: controller.signal,
    withCredentials: true,
  });
}

interface SignupParams extends FetchParams {
  phoneNumber: string;
  password: string;
}

export async function signup({
  phoneNumber,
  password,
  controller,
}: SignupParams) {
  return fetchInstance.post<void>('/users', {
    phoneNumber,
    password,
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
