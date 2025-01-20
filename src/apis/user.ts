import { SignupContent } from '@/utils/type';
import axios from 'axios';

const mockInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export function requestPhoneNumberVerificationCode(phoneNumber: string) {
  console.log(phoneNumber);
  return mockInstance.post('/posts', {});
}

export function validatePhoneNumberVerificationCode(verificationCode: string) {
  console.log(verificationCode);
  return mockInstance.post('/posts', {});
}

export function signup(data: SignupContent) {
  console.log(data);
  return mockInstance.post('/posts', {});
}

export function signin(data: SigninContent) {
  console.log(data);
  return mockInstance.post('/posts', {});
}
