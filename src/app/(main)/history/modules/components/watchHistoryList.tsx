'use client';

import { useState } from 'react';
import { watchHistoryListStyle } from '../styles/watchHistoryListStyle.css';
import WatchHistoryCard from './watchHistoryCard';
import { WatchHistoryListByDate } from '../utils/type';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import { deleteWatchHistory } from '../apis/deleteWatchHistory';
import Date from '@/components/common/date';

const DELETE_WATCH_HISTORY_SUCCEEDED = '시청 기록을 삭제했습니다.';
const DELETE_WATCH_HISTORY_FAILED = '시청 기록 삭제에 실패했습니다.';

interface WatchHistoryListProps { data: WatchHistoryListByDate };

export default function WatchHistoryList({ data }: WatchHistoryListProps) {
  const [watchHistoryListByDate, setWatchHistoryListByDate] = useState<WatchHistoryListByDate>(data);

  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  const handleDeleteWatchHistory = ({
    videoId,
    dateIndex,
  }: {
    videoId: string;
    dateIndex: number;
  }) => {
    fetchHandler(({
      accessToken,
      controller,
    }) => deleteWatchHistory({
      videoId,
      accessToken,
      controller,
    }), {
      onSuccess: () => {
        setWatchHistoryListByDate((prev) => prev.map((watchHistoryList, index) => {
          if (index !== dateIndex) {
            return watchHistoryList;
          }

          const filteredWatchHistories = watchHistoryList.watchHistories.filter((e) => e.video.id !== videoId);

          if (filteredWatchHistories.length > 0) {
            return {
              ...watchHistoryList,
              watchHistories: filteredWatchHistories,
            };
          }

          return null;
        }).filter((e) => e !== null));

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
        {watchHistoryListByDate.length > 0
          ? watchHistoryListByDate.map(({
            watchedDate,
            watchHistories,
          }, dateIndex) => (
            <li key={watchedDate}>
              <div className={watchHistoryListStyle.date}>
                <Date
                  dateStr={watchedDate}
                  type="date"
                />
              </div>
              <ul className={watchHistoryListStyle.list}>
                {watchHistories.map((watchHistory) => (
                  <li key={watchHistory.video.id}>
                    <WatchHistoryCard
                      data={watchHistory}
                      handleDeleteWatchHistory={() => handleDeleteWatchHistory({
                        videoId: watchHistory.video.id,
                        dateIndex,
                      })}
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))
          : <div>시청 기록이 없습니다.</div>}
      </ul>
    </div>
  );
}
