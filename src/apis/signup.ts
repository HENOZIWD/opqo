import { SignupContent } from '@/utils/type';
import axios from 'axios';

const mockInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export async function requestPhoneNumberVerificationCode(phoneNumber: string) {
  console.log(phoneNumber);
  return mockInstance.post('/posts', {});
}

export async function validatePhoneNumberVerificationCode(verificationCode: string) {
  console.log(verificationCode);
  return mockInstance.post('/posts', {});
}

export async function signup(data: SignupContent) {
  console.log(data);
  return mockInstance.post('/posts', {});
}
