import { FetchParams } from '@/utils/type';
import axios from 'axios';

const userInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

interface requestPhoneNumberVerificationCodeParams extends FetchParams { phoneNumber: string }
interface requestPhoneNumberVerificationCodeResponse { authToken: string }

export async function requestPhoneNumberVerificationCode({
  phoneNumber,
  controller,
}: requestPhoneNumberVerificationCodeParams) {
  return userInstance.post<requestPhoneNumberVerificationCodeResponse>('/user-auth', { phoneNumber }, { signal: controller.signal });
}

interface validatePhoneNumberVerificationCodeParams extends FetchParams {
  phoneNumber: string;
  authCode: string;
  authToken: string;
}

export async function validatePhoneNumberVerificationCode({
  phoneNumber,
  authCode,
  authToken,
  controller,
}: validatePhoneNumberVerificationCodeParams) {
  return userInstance.post<void>('/user-auth/valid', {
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
  return userInstance.post<void>('/users', {
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
  return userInstance.post<void>('/users/me/token/user', {
    phoneNumber,
    password,
  }, { signal: controller.signal });
}
