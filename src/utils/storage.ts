import { ACCESS_TOKEN } from './constant';

export function setAccessToken(accessToken: string) {
  sessionStorage.setItem(ACCESS_TOKEN, accessToken);
}

export function getAccessToken() {
  return sessionStorage.getItem(ACCESS_TOKEN);
}

export function removeAccessToken() {
  sessionStorage.removeItem(ACCESS_TOKEN);
}
