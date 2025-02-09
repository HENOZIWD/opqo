import { CHANNEL_ID, CHANNEL_IMAGE_URL, CHANNEL_NAME, CHANNEL_TOKEN } from './constant';
import { AuthSession } from './type';

export function setAuthSession({
  channelToken,
  channelId,
  channelImageUrl,
  channelName,
}: AuthSession) {
  if (channelToken) {
    sessionStorage.setItem(CHANNEL_TOKEN, channelToken);
  }

  if (channelId) {
    sessionStorage.setItem(CHANNEL_ID, channelId);
  }

  if (channelImageUrl) {
    sessionStorage.setItem(CHANNEL_IMAGE_URL, channelImageUrl);
  }

  if (channelName) {
    sessionStorage.setItem(CHANNEL_NAME, channelName);
  }
}

export function getAuthSession(): AuthSession {
  const channelToken = sessionStorage.getItem(CHANNEL_TOKEN);
  const channelId = sessionStorage.getItem(CHANNEL_ID);
  const channelImageUrl = sessionStorage.getItem(CHANNEL_IMAGE_URL);
  const channelName = sessionStorage.getItem(CHANNEL_NAME);

  return {
    channelToken,
    channelId,
    channelImageUrl,
    channelName,
  };
}

export function removeAuthSession() {
  sessionStorage.removeItem(CHANNEL_TOKEN);
  sessionStorage.removeItem(CHANNEL_ID);
  sessionStorage.removeItem(CHANNEL_IMAGE_URL);
  sessionStorage.removeItem(CHANNEL_NAME);
}
