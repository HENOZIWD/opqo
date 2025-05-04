'use client';

import Toast from '@/components/common/toast';
import { useCountdown } from '@/hooks/useCountdown';
import { TOAST_DURATION_SECOND } from '@/utils/constant';
import { ToastType } from '@/utils/type';
import { createContext, useEffect, useState } from 'react';

interface Toast {
  message: string;
  type: ToastType;
}

type ToastFunction = ({
  message,
  type,
}: {
  message: string;
  type?: ToastType;
}) => void;

export const ToastContext = createContext<ToastFunction | null>(null);

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [toastQueue, setToastQueue] = useState<Toast[]>([]);

  const {
    count,
    setCountdown,
  } = useCountdown();

  useEffect(() => {
    if (isShown || toastQueue.length === 0) {
      return;
    }

    setIsShown(true);
    setCountdown(TOAST_DURATION_SECOND);
  }, [isShown, toastQueue, setCountdown]);

  useEffect(() => {
    if (count > 0) {
      return;
    }

    setToastQueue((prev) => prev.slice(1));
    setIsShown(false);
  }, [count]);

  const showToast: ToastFunction = ({
    message,
    type = 'normal',
  }) => {
    setToastQueue((prev) => [...prev, {
      message,
      type,
    }]);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {count > 0 && toastQueue.length > 0
        ? (
          <Toast
            message={toastQueue[0].message}
            type={toastQueue[0].type}
          />
        )
        : null}
    </ToastContext.Provider>
  );
}
