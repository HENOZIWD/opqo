export interface AuthSession {
  accessToken: string | null;
  channelId: string | null;
  channelName: string | null;
}

export type ToastType = 'normal' | 'error';

export interface AccessToken {
  id: string;
  email: string;
  name: string;
  picture: string;
  exp: number;
}

export interface BadRequestResponse {
  code: string;
  message: string;
}
