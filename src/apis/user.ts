import { SignupContent } from '@/utils/type';
import axios from 'axios';

const mockInstance = axios.create({
  baseURL: '/mockApi',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export async function requestPhoneNumberVerificationCode(phoneNumber: string) {
  return mockInstance.post('/requestVerificationCode', { phoneNumber });
}

export async function validatePhoneNumberVerificationCode(verificationCode: string) {
  return mockInstance.post('/validateVerificationCode', { verificationCode });
}

export async function signup(data: SignupContent) {
  return mockInstance.post('/signup', {
    phoneNumber: data.phoneNumber,
    password: data.password,
  });
}
