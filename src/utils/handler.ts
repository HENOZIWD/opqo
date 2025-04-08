import { AxiosResponse } from 'axios';

export async function fetchHandlerWithServerComponent<T>(fetchFn: () => Promise<AxiosResponse<T>>) {
  try {
    const response = await fetchFn();

    return {
      data: response.data,
      error: null,
    };
  }
  catch (error) {
    return {
      data: null,
      error,
    };
  }
}
