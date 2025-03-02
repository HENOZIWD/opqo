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

export interface FetchParams { controller: AbortController }

export interface MyChannelResponse {
  id: string;
  name: string;
}

export interface ChannelResponse {
  id: string;
  name: string;
  description: string;
  createdDate: Date;
}

export interface ChannelVideoCardResponse {
  id: string;
  title: string;
  duration: string;
  uploadDate: Date;
}

export interface VideoCardResponse {
  id: string;
  title: string;
  duration: string;
  uploadDate: Date;
  channelId: string;
  channelName: string;
}

export interface VideoResponse {
  id: string;
  title: string;
  description: string;
  uploadDate: Date;
  channelId: string;
  channelName: string;
}
