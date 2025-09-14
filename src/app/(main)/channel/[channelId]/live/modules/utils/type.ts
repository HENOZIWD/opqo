export interface LiveStreamInfo {
  title: string;
  isStreaming: boolean;
  streamStartDate: string;
  userId: string;
  user: {
    name: string;
    picture: string;
  };
}

export interface MessageInfo {
  roomId: string;
  id: string;
  name: string;
  message: string;
}
