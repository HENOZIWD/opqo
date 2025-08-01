export interface WatchHistory {
  watchProgress: number;
  watchedDate: string;
  video: {
    id: string;
    title: string;
    duration: number;
    user: {
      id: string;
      name: string;
      picture: string;
    };
  };
}
