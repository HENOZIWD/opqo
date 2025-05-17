import { STORAGE_KEY_MUTE, STORAGE_KEY_VOLUME } from './constant';

export function setVolumeStorageValue(value: number) {
  localStorage.setItem(STORAGE_KEY_VOLUME, value.toString());
}

export function getVolumeStorageValue() {
  const volume = Number.parseFloat(localStorage.getItem(STORAGE_KEY_VOLUME) ?? '0.5');

  return volume;
}

export function setMuteStorageValue(value: boolean) {
  localStorage.setItem(STORAGE_KEY_MUTE, value ? 'TRUE' : 'FALSE');
}

export function getMuteStorageValue() {
  return (localStorage.getItem(STORAGE_KEY_MUTE) ?? 'FALSE') === 'TRUE' ? true : false;
}
