import { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import { useAbortController } from './useAbortController';

export function useFetch() {
  const { createAbortController } = useAbortController();

  const fetchHandler = async <T>(
    fetchFn: (controller: AbortController) => Promise<AxiosResponse<T>>,
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

    try {
      const response = await fetchFn(controller);
      onSuccess(response);
    }
    catch (error) {
      if (isAxiosError(error)) {
        onError(error);
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
