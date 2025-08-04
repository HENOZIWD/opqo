'use client';

import { ChangeEvent, RefObject, useRef } from 'react';
import { throttle } from '@/utils/throttle';
import Slider from '../common/slider';
import * as Popover from '@radix-ui/react-popover';
import { EnterFullScreenIcon, ExitFullScreenIcon, PauseIcon, PlayIcon, SpeakerLoudIcon, SpeakerOffIcon } from '@radix-ui/react-icons';
import { videoPlayerControlPanelStyle } from '@/styles/video/videoPlayerControlPanelStyle.css';
import { numberToTime } from '@/utils/convert';
import { useVideoPlayerState } from '@/hooks/useVideoPlayerState';

interface VideoPlayerControlPanelProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  duration: number;
  playVideo: () => void;
  pauseVideo: () => void;
  handleMuteVolume: () => void;
  handleFullscreen: () => void;
  handlePlayPause: () => void;
}

export default function VideoPlayerControlPanel({
  videoRef,
  duration,
  playVideo,
  pauseVideo,
  handleMuteVolume,
  handleFullscreen,
  handlePlayPause,
}: VideoPlayerControlPanelProps) {
  const {
    isPlaying,
    currentTime,
    setCurrentTime,
    bufferedProgress,
    isMuted,
    setIsMuted,
    isFullscreen,
    volume,
    setVolume,
    currentResolutionLevel,
    setCurrentResolutionLevel,
    resolutionLevels,
  } = useVideoPlayerState();

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
    }

    videoRef.current.volume = value;
    setVolume(value);
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
          onClick={handlePlayPause}
          title={isPlaying ? '동영상 일시정지(Spacebar)' : '동영상 재생(Spacebar)'}
          aria-label={isPlaying ? '동영상 일시정지(Spacebar)' : '동영상 재생(Spacebar)'}
        >
          {isPlaying
            ? <PauseIcon className={videoPlayerControlPanelStyle.playPauseButton} />
            : <PlayIcon className={videoPlayerControlPanelStyle.playPauseButton} />}
        </button>
        <button
          onClick={handleMuteVolume}
          title={isMuted || volume === 0 ? '음소거 해제(M)' : '음소거(M)'}
          aria-label={isMuted || volume === 0 ? '음소거 해제(M)' : '음소거(M)'}
        >
          {isMuted || volume === 0
            ? <SpeakerOffIcon className={videoPlayerControlPanelStyle.volumeButton} />
            : <SpeakerLoudIcon className={videoPlayerControlPanelStyle.volumeButton} />}
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
          {resolutionLevels.length > 0
            ? (
              <Popover.Root>
                <Popover.Trigger asChild>
                  <button
                    type="button"
                    className={videoPlayerControlPanelStyle.resolutionButton}
                  >
                    화질:
                    {' '}
                    {currentResolutionLevel.level === -1 ? '자동' : `${currentResolutionLevel.name}p`}
                  </button>
                </Popover.Trigger>

                <Popover.Content
                  sideOffset={16}
                  side="top"
                >
                  <ul className={videoPlayerControlPanelStyle.resolutionList}>
                    <li key="autoLevel">
                      <Popover.Close asChild>
                        <button
                          type="button"
                          className={videoPlayerControlPanelStyle.resolutionItem}
                          onClick={() => setCurrentResolutionLevel({
                            level: -1,
                            name: '자동',
                          })}
                        >
                          자동
                        </button>
                      </Popover.Close>
                    </li>
                    {resolutionLevels?.map((level) => (
                      <li key={level.level}>
                        <Popover.Close asChild>
                          <button
                            type="button"
                            className={videoPlayerControlPanelStyle.resolutionItem}
                            onClick={() => setCurrentResolutionLevel(level)}
                          >
                            {level.name}
                            p
                          </button>
                        </Popover.Close>
                      </li>
                    ))}
                  </ul>
                </Popover.Content>
              </Popover.Root>
            )
            : null}
          <button
            onClick={handleFullscreen}
            title={isFullscreen ? '전체 화면 해제(F)' : '전체 화면으로 전환(F)'}
            aria-label={isFullscreen ? '전체 화면 해제(F)' : '전체 화면으로 전환(F)'}
          >
            {isFullscreen
              ? <ExitFullScreenIcon className={videoPlayerControlPanelStyle.fullscreenButton} />
              : <EnterFullScreenIcon className={videoPlayerControlPanelStyle.fullscreenButton} />}
          </button>
        </div>
      </div>
    </div>
  );
}
