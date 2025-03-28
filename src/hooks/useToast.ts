import { ToastContext } from '@/contexts/toast';
import { useContext } from 'react';

export function useToast() {
  const showToast = useContext(ToastContext);

  if (!showToast) {
    throw Error('Toast Context is null');
  }

  return { showToast };
}
