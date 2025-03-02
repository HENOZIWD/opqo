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
