'use client';

import { ToastType } from '@/utils/type';
import { useCountdown } from '@/hooks/useCountdown';
import { useEffect } from 'react';
import { TOAST_VISIBILITY_DURATION_SECOND } from '@/utils/constant';
import { toastStyle } from '@/styles/common.css';

interface ToastProps {
  message: string;
  type: ToastType;
}

export default function Toast({
  message,
  type,
}: ToastProps) {
  const {
    count,
    setCountdown,
  } = useCountdown();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(TOAST_VISIBILITY_DURATION_SECOND);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (type === 'error') {
    return (
      <div
        className={`${toastStyle.container} ${toastStyle.error} ${count > 0 ? toastStyle.show : ''}`}
        aria-live="assertive"
      >
        {message}
      </div>
    );
  }

  return (
    <div
      className={`${toastStyle.container} ${count > 0 ? toastStyle.show : ''}`}
      aria-live="polite"
    >
      {message}
    </div>
  );
}
