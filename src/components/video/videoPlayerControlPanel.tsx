'use client';

import { ChangeEvent, Dispatch, RefObject, SetStateAction, useRef } from 'react';
import PauseIcon from '@/icons/pauseIcon';
import PlayIcon from '@/icons/playIcon';
import FullscreenIcon from '@/icons/fullscreenIcon';
import VolumeIcon from '@/icons/volumeIcon';
import VolumeMuteIcon from '@/icons/volumeMuteIcon';
import ExitFullscreenIcon from '@/icons/exitFullscreenIcon';
import { numberToTime } from '@/utils/time';
import { throttle } from '@/utils/throttle';
import { videoPlayerControlPanelStyle } from '@/styles/video.css';
import Slider from '../common/slider';
import { setMuteStorageValue, setVolumeStorageValue } from '@/utils/storage';
import * as Popover from '@radix-ui/react-popover';

interface VideoPlayerControlPanelProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  bufferedProgress: number;
  playVideo: () => void;
  pauseVideo: () => void;
  handleMuteVolume: () => void;
  handleFullscreen: () => void;
  isMuted: boolean;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
  isFullscreen: boolean;
  handlePlayPause: () => void;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
  availableResolutionList?: string[];
  currentResolutionIndex?: number;
  setCurrentResolutionIndex?: Dispatch<SetStateAction<number>>;
}

export default function VideoPlayerControlPanel({
  videoRef,
  isPlaying,
  currentTime,
  duration,
  setCurrentTime,
  bufferedProgress,
  playVideo,
  pauseVideo,
  handleMuteVolume,
  handleFullscreen,
  isMuted,
  setIsMuted,
  isFullscreen,
  handlePlayPause,
  volume,
  setVolume,
  availableResolutionList,
  currentResolutionIndex,
  setCurrentResolutionIndex,
}: VideoPlayerControlPanelProps) {
  const isPlayingBeforeSeek = useRef<boolean>(null);
  const throttledHandleSeekRef = useRef(throttle((e: ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) {
      return;
    }

    const value = Number(e.target.value);

    videoRef.current.currentTime = value;
    setCurrentTime(value);
  }, 50));

  const handleStartSeek = () => {
    isPlayingBeforeSeek.current = isPlaying;

    if (isPlaying) {
      pauseVideo();
    }
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    throttledHandleSeekRef.current?.(e);
  };

  const handleEndSeek = () => {
    if (isPlayingBeforeSeek.current) {
      playVideo();
    }
  };

  const handleChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(Number.parseFloat(e.target.value).toFixed(2));

    if (!videoRef.current || Number.isNaN(value)) {
      return;
    }

    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      setMuteStorageValue(false);
    }

    videoRef.current.volume = value;
    setVolume(value);
    setVolumeStorageValue(value);
  };

  return (
    <div className={videoPlayerControlPanelStyle.container}>
      <Slider
        name="동영상 구간 탐색"
        min={0}
        max={duration}
        step="any"
        value={currentTime}
        mid={bufferedProgress}
        onChange={handleSeek}
        mouseDownAction={handleStartSeek}
        mouseUpAction={handleEndSeek}
      />
      <div className={videoPlayerControlPanelStyle.panel}>
        <button
          className={videoPlayerControlPanelStyle.playPauseButton}
          onClick={handlePlayPause}
          title={isPlaying ? '동영상 일시정지(Spacebar)' : '동영상 재생(Spacebar)'}
          aria-label={isPlaying ? '동영상 일시정지(Spacebar)' : '동영상 재생(Spacebar)'}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          className={videoPlayerControlPanelStyle.volumeButton}
          onClick={handleMuteVolume}
          title={isMuted || volume === 0 ? '음소거 해제(M)' : '음소거(M)'}
          aria-label={isMuted || volume === 0 ? '음소거 해제(M)' : '음소거(M)'}
        >
          {isMuted || volume === 0 ? <VolumeMuteIcon /> : <VolumeIcon />}
        </button>
        <div className={videoPlayerControlPanelStyle.volumeSlider}>
          <Slider
            name="음량 조절"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={handleChangeVolume}
          />
        </div>
        <div>
          {isMuted ? 0 : (volume * 100).toFixed(0)}
        </div>
        <div>
          {numberToTime(currentTime)}
          {' '}
          /
          {' '}
          {numberToTime(duration)}
        </div>
        <div className={videoPlayerControlPanelStyle.rightSection}>
          {availableResolutionList
          && setCurrentResolutionIndex
          && currentResolutionIndex !== undefined
            ? (
              <Popover.Root>
                <Popover.Trigger asChild>
                  <button
                    type="button"
                    className={videoPlayerControlPanelStyle.resolutionButton}
                  >
                    화질:
                    {' '}
                    {availableResolutionList[currentResolutionIndex]}
                  </button>
                </Popover.Trigger>

                <Popover.Portal>
                  <Popover.Content sideOffset={16}>
                    <ul className={videoPlayerControlPanelStyle.resolutionList}>
                      {availableResolutionList?.map((res, resolutionIndex) => (
                        <li key={res}>
                          <Popover.Close asChild>
                            <button
                              type="button"
                              className={videoPlayerControlPanelStyle.resolutionItem}
                              onClick={() => setCurrentResolutionIndex(resolutionIndex)}
                            >
                              {res}
                            </button>
                          </Popover.Close>
                        </li>
                      ))}
                    </ul>
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            )
            : null}
          <button
            className={videoPlayerControlPanelStyle.fullscreenButton}
            onClick={handleFullscreen}
            title={isFullscreen ? '전체 화면 해제(Enter)' : '전체 화면으로 전환(Enter)'}
            aria-label={isFullscreen ? '전체 화면 해제(Enter)' : '전체 화면으로 전환(Enter)'}
          >
            {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}
