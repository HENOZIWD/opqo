'use client';

import { atom, Provider } from 'jotai';
import { ReactNode } from 'react';
import { atomWithStorage } from 'jotai/utils';

const STORAGE_KEY_VOLUME = 'VOLUME';
const STORAGE_KEY_MUTE = 'MUTE';

interface VideoResolutionLevel {
  level: number;
  name: string;
}

const isPanelShownAtom = atom<boolean>(false);
const isPlayingAtom = atom<boolean>(false);
const currentTimeAtom = atom<number>(0);
const bufferedProgressAtom = atom<number>(0);
const isBufferingAtom = atom<boolean>(false);
const isMutedAtom = atomWithStorage<boolean>(STORAGE_KEY_MUTE, false);
const isFullscreenAtom = atom<boolean>(false);
const volumeAtom = atomWithStorage<number>(STORAGE_KEY_VOLUME, 0.5);
const currentResolutionLevelAtom = atom<VideoResolutionLevel>({
  level: -1,
  name: '자동',
});
const resolutionLevelsAtom = atom<VideoResolutionLevel[]>([]);

export const VideoPlayerStateAtoms = {
  isPanelShownAtom,
  isPlayingAtom,
  currentTimeAtom,
  bufferedProgressAtom,
  isBufferingAtom,
  isMutedAtom,
  isFullscreenAtom,
  volumeAtom,
  currentResolutionLevelAtom,
  resolutionLevelsAtom,
};

interface VideoPlayerProviderProps { children: ReactNode }

export default function VideoPlayerStateProvider({ children }: VideoPlayerProviderProps) {
  return (
    <Provider>
      {children}
    </Provider>
  );
}
