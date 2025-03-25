export interface MyChannelResponse {
  id: string;
  name: string;
}

export interface ChannelResponse {
  id: string;
  name: string;
  description: string;
  createdDate: string;
}

export interface ChannelVideoCardResponse {
  id: string;
  title: string;
  createdDate: string;
}

export interface VideoCardResponse {
  id: string;
  title: string;
  createdDate: string;
  channelId: string;
  channelName: string;
}

export interface VideoResponse {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  channelId: string;
  channelName: string;
}
