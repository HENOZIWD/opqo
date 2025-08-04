'use client';

import { useCountdown } from '@/hooks/useCountdown';
import { useFetch } from '@/hooks/useFetch';
import { useVideoPlayerState } from '@/hooks/useVideoPlayerState';
import { useCallback, useEffect, useRef } from 'react';
import { updateWatchHistory } from '../apis/updateWatchHistory';

const HISTORY_UPDATE_INTERVAL_SECOND = 30;

interface WatchHistoryUpdaterProps {
  videoId: string;
  prevWatchProgress: number;
}

export default function WatchHistoryUpdater({
  videoId,
  prevWatchProgress,
}: WatchHistoryUpdaterProps) {
  const {
    currentTime,
    setCurrentTime,
  } = useVideoPlayerState();

  const {
    count,
    setCountdown,
  } = useCountdown(HISTORY_UPDATE_INTERVAL_SECOND);

  const { fetchHandler } = useFetch();

  const currentTimeRef = useRef<number>(currentTime);
  const prevTimeRef = useRef<number>(prevWatchProgress);

  useEffect(() => {
    currentTimeRef.current = currentTime;
  }, [currentTime]);

  const fetch = useCallback((watchProgress: number) => {
    fetchHandler(({
      accessToken,
      controller,
    }) => updateWatchHistory({
      videoId,
      watchProgress,
      accessToken,
      controller,
    }), {
      onSuccess: () => {},
      onError: () => {},
    });
  }, []);

  useEffect(() => {
    setCurrentTime(prevWatchProgress);
    fetch(prevWatchProgress);

    return () => {
      fetch(currentTimeRef.current);
    };
  }, []);

  useEffect(() => {
    if (count === 0) {
      setCountdown(HISTORY_UPDATE_INTERVAL_SECOND);

      if (currentTimeRef.current !== prevTimeRef.current) {
        fetch(currentTimeRef.current);
        prevTimeRef.current = currentTimeRef.current;
      }
    }
  }, [count, fetch, setCountdown]);

  return null;
}
