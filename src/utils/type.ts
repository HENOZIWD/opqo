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
