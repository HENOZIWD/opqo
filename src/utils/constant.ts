import { Options } from 'ky';

export const CONTENT_TYPE_APPLICATION_JSON = 'application/json';

export const ACCESS_TOKEN = 'accessToken';

export const TOAST_DURATION_SECOND = 6;
export const TOAST_VISIBILITY_DURATION_SECOND = 5;

export const ROLE_USER = 'USER';
export const ROLE_CHANNEL = 'CHANNEL';

export const ACCESS_TOKEN_REFRESH_OFFSET = 60 * 1000; // 1분

export const STORAGE_KEY_VOLUME = 'VOLUME';
export const STORAGE_KEY_MUTE = 'MUTE';

export const FETCH_CACHE_POLICY: Options = {
  cache: 'force-cache',
  next: { revalidate: 10 },
};
