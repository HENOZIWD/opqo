import { useCallback, useEffect, useRef, useState } from 'react';

export function useCountdown(initialCount = 0) {
  const [count, setCount] = useState<number>(initialCount);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const clearTimer = () => {
    clearInterval(timerRef.current ?? undefined);
    timerRef.current = null;
  };

  const setCountdown = useCallback((value: number) => {
    clearTimer();

    setCount(value);

    if (value > 0) {
      timerRef.current = setInterval(() => {
        setCount((prev) => {
          if (prev <= 1) {
            clearTimer();

            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }
  }, []);

  useEffect(() => {
    setCountdown(initialCount);

    return () => {
      clearTimer();
    };
  }, [initialCount, setCountdown]);

  return {
    count,
    setCountdown,
  };
}
