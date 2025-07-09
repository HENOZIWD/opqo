import { Options } from 'ky';

export const CONTENT_TYPE_APPLICATION_JSON = 'application/json';

export const FETCH_CACHE_POLICY: Options = {
  cache: 'force-cache',
  next: { revalidate: 10 },
};
