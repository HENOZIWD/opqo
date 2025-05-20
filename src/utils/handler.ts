import { KyResponse } from 'ky';

export async function fetchHandlerWithServerComponent<T>(fetchFn: () => Promise<KyResponse<T>>) {
  try {
    const response = await fetchFn();

    const data = await response.json();

    return {
      data,
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
