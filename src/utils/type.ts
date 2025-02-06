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
  channelToken: string | null;
  channelImageUrl: string | null;
  channelName: string | null;
}

export interface AuthAction { type: 'signin' | 'signout' }

export interface UploadVideoContent {
  videoTitle: string;
  description: string;
}
