export interface SignupContent {
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface SigninContent {
  phoneNumber: string;
  password: string;
}

export interface CreateChannelContent {
  channelName: string;
  description: string;
}

export interface AuthSession {
  accessToken: string | null;
  channelId: string | null;
  channelName: string | null;
}

export interface UploadVideoContent {
  videoTitle: string;
  description: string;
}

export interface VideoMetadata {
  videoWidth: number;
  videoHeight: number;
  videoDuration: number;
  videoExtension: string;
}

export type ToastType = 'normal' | 'error';

export interface AccessToken {
  id: string | null;
  name: string | null;
  role: 'user' | 'channel';
  exp: number;
}
