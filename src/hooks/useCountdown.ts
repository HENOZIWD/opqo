import { useEffect, useState } from 'react';

export function useCountdown() {
  const [count, setCount] = useState<number>(0);

  const setCountdown = (value: number) => {
    setCount(value);
  };

  useEffect(() => {
    if (count <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  return {
    count,
    setCountdown,
  };
}
