import { AxiosError, AxiosResponse, isAxiosError } from 'axios';

export const fetchHandler = async <T>(
  fetchFn: () => Promise<AxiosResponse<T>>,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: (response?: AxiosResponse<T>) => void;
    onError: (error?: AxiosError) => void;
  },
) => {
  try {
    const response = await fetchFn();
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
};
