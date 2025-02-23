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

export interface Auth {
  isSignin: boolean;
  channelId: string | null;
  channelImageUrl: string | null;
  channelName: string | null;
}

export interface AuthAction { type: 'signin' | 'signout' }

export interface AuthSession {
  channelToken: string | null;
  channelId: string | null;
  channelImageUrl: string | null;
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
