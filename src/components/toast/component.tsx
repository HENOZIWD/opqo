import { ToastType } from '@/utils/type';
import styles from './style.module.css';
import { useCountdown } from '@/hooks/useCountdown';
import { useEffect } from 'react';
import { TOAST_VISIBILITY_DURATION_SECOND } from '@/utils/constant';

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
        className={`${styles.container} ${styles.error} ${count > 0 ? styles.show : ''}`}
        aria-live="assertive"
      >
        {message}
      </div>
    );
  }

  return (
    <div
      className={`${styles.container} ${count > 0 ? styles.show : ''}`}
      aria-live="polite"
    >
      {message}
    </div>
  );
}
