'use client';

import { useEffect, useState } from 'react';
import { liveStreamInfoStyle } from '../styles/liveStreamInfoStyle.css';
import { formatElapsedTime } from '../utils/format';

interface ElapsedTimeProps { startTime: string }

export default function ElapsedTime({ startTime }: ElapsedTimeProps) {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - new Date(startTime).getTime()) / 1000);
      setElapsedTime(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className={liveStreamInfoStyle.elapsedTime}>
      스트리밍 중:
      {' '}
      {formatElapsedTime(elapsedTime)}
    </div>
  );
}
