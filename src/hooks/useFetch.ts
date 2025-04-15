import { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import { useAbortController } from './useAbortController';
import { useToken } from './useToken';

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
    }: FetchFnParams) => Promise<AxiosResponse<T>>,
    {
      onSuccess,
      onError,
      onFinal,
    }: {
      onSuccess: (response?: AxiosResponse<T>) => void;
      onError: (error?: AxiosError) => void;
      onFinal?: () => void;
    },
  ) => {
    const controller = createAbortController();

    const successAsyncFn = async (response?: AxiosResponse<T>) => onSuccess(response);
    const errorAsyncFn = async (error?: AxiosError) => onError(error);

    try {
      const response = await fetchFn({
        controller,
        accessToken,
      });
      await successAsyncFn(response);
    }
    catch (error) {
      if (isAxiosError(error)) {
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
