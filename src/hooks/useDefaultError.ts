import { useToast } from './useToast';
import { ERR_MSG_AUTHORIZATION_FAILED, ERR_MSG_INTERNAL_SERVER, ERR_MSG_TIMEOUT, ERR_MSG_TOO_MANY_REQUEST } from '@/utils/message';

export function useDefaultError() {
  const { showToast } = useToast();

  const handleDefaultError = (status: number | undefined) => {
    if (status === 401) {
      showToast({
        message: ERR_MSG_AUTHORIZATION_FAILED,
        type: 'error',
      });
    }
    else if (status === 429) {
      showToast({
        message: ERR_MSG_TOO_MANY_REQUEST,
        type: 'error',
      });
    }
    else {
      showToast({
        message: ERR_MSG_INTERNAL_SERVER,
        type: 'error',
      });
    }
  };

  const handleTimeoutError = () => {
    showToast({
      message: ERR_MSG_TIMEOUT,
      type: 'error',
    });
  };

  return {
    handleDefaultError,
    handleTimeoutError,
  };
}
