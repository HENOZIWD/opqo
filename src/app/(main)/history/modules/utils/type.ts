export interface WatchHistory {
  watchProgress: number;
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

export type WatchHistoryListByDate = {
  watchedDate: string;
  watchHistories: WatchHistory[];
}[];
