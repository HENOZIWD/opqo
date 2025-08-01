'use client';

import { useState } from 'react';
import { watchHistoryListStyle } from '../styles/watchHistoryListStyle.css';
import WatchHistoryCard from './watchHistoryCard';
import { WatchHistory } from '../utils/type';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import { deleteWatchHistory } from '../apis/deleteWatchHistory';

const DELETE_WATCH_HISTORY_SUCCEEDED = '시청 기록을 삭제했습니다.';
const DELETE_WATCH_HISTORY_FAILED = '시청 기록 삭제에 실패했습니다.';

interface WatchHistoryListProps { data: WatchHistory[] };

export default function WatchHistoryList({ data }: WatchHistoryListProps) {
  const [watchhistoryList, setWatchHistoryList] = useState<WatchHistory[]>(data);

  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  const handleDeleteWatchHistory = (videoId: string) => {
    fetchHandler(({
      accessToken,
      controller,
    }) => deleteWatchHistory({
      videoId,
      accessToken,
      controller,
    }), {
      onSuccess: () => {
        setWatchHistoryList((prev) => prev.filter((e) => e.video.id !== videoId));

        showToast({ message: DELETE_WATCH_HISTORY_SUCCEEDED });
      },
      onError: () => {
        showToast({
          message: DELETE_WATCH_HISTORY_FAILED,
          type: 'error',
        });
      },
    });
  };

  return (
    <div className={watchHistoryListStyle.container}>
      <ul className={watchHistoryListStyle.list}>
        {watchhistoryList.length > 0
          ? watchhistoryList.map((watchHistory) => (
            <li key={watchHistory.video.id}>
              <WatchHistoryCard
                data={watchHistory}
                handleDeleteWatchHistory={() => handleDeleteWatchHistory(watchHistory.video.id)}
              />
            </li>
          ))
          : <div>시청 기록이 없습니다.</div>}
      </ul>
    </div>
  );
}
