import { useAbortController } from './useAbortController';
import { useToken } from './useToken';
import { BadRequestResponse } from '@/utils/type';
import { HTTPError, KyResponse, TimeoutError } from 'ky';

interface FetchFnParams {
  controller: AbortController;
  accessToken: string | null;
}

export function useFetch() {
  const { createAbortController } = useAbortController();
  const { accessToken } = useToken();

  const fetchHandler = async <T>(
    fetchFn: ({
      controller,
      accessToken,
    }: FetchFnParams) => Promise<KyResponse<T>>,
    {
      onSuccess,
      onError,
      onFinal,
    }: {
      onSuccess: (response?: KyResponse<T>) => void;
      onError: (error?: KyResponse<BadRequestResponse> | TimeoutError) => void;
      onFinal?: () => void;
    },
  ) => {
    const controller = createAbortController();

    const successAsyncFn = async (response?: KyResponse<T>) => onSuccess(response);
    const errorAsyncFn = async (errorResponse?: KyResponse<BadRequestResponse> | TimeoutError) => onError(errorResponse);

    try {
      const response = await fetchFn({
        controller,
        accessToken,
      });
      await successAsyncFn(response);
    }
    catch (error) {
      if (error instanceof HTTPError) {
        await errorAsyncFn(error.response);
      }
      else if (error instanceof TimeoutError) {
        await errorAsyncFn(error);
      }
      else {
        console.error(error);
      }
    }
    finally {
      onFinal?.();
    }
  };

  return { fetchHandler };
}
