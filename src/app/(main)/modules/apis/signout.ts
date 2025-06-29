import { fetchInstance } from '@/apis/instance';
import { FetchParams } from '@/apis/type';

export async function signout({ controller }: FetchParams) {
  return fetchInstance.post<void>(
    'signout',
    {
      signal: controller.signal,
      credentials: 'include',
    },
  );
}
