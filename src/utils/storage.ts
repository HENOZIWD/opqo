import { CHANNEL_ID, CHANNEL_NAME, CHANNEL_TOKEN } from './constant';
import { AuthSession } from './type';

export function setAuthSession({
  channelToken,
  channelId,
  channelName,
}: AuthSession) {
  if (channelToken) {
    sessionStorage.setItem(CHANNEL_TOKEN, channelToken);
  }

  if (channelId) {
    sessionStorage.setItem(CHANNEL_ID, channelId);
  }

  if (channelName) {
    sessionStorage.setItem(CHANNEL_NAME, channelName);
  }
}

export function getAuthSession(): AuthSession {
  const channelToken = sessionStorage.getItem(CHANNEL_TOKEN);
  const channelId = sessionStorage.getItem(CHANNEL_ID);
  const channelName = sessionStorage.getItem(CHANNEL_NAME);

  return {
    channelToken,
    channelId,
    channelName,
  };
}

export function removeAuthSession() {
  sessionStorage.removeItem(CHANNEL_TOKEN);
  sessionStorage.removeItem(CHANNEL_ID);
  sessionStorage.removeItem(CHANNEL_NAME);
}
