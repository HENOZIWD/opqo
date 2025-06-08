import { ROLE_CHANNEL, ROLE_USER } from './constant';

export interface SignupContent {
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface SigninContent {
  phoneNumber: string;
  password: string;
}

export interface AuthSession {
  accessToken: string | null;
  channelId: string | null;
  channelName: string | null;
}

export type ToastType = 'normal' | 'error';

export interface AccessToken {
  id: string | null;
  name: string | null;
  role: typeof ROLE_USER | typeof ROLE_CHANNEL;
  exp: number;
}

export interface BadRequestResponse {
  code: string;
  message: string;
}
