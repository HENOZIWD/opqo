'use client';

import { ChangeEvent, Dispatch, RefObject, SetStateAction, useRef, useState } from 'react';
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
}: VideoPlayerControlPanelProps) {
  const [volume, setVolume] = useState<number>(0.5);

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

    if (isMuted && value > 0) {
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
          className={`${videoPlayerControlPanelStyle.panelButton} ${videoPlayerControlPanelStyle.playPauseButton}`}
          onClick={handlePlayPause}
          title={isPlaying ? '동영상 일시정지' : '동영상 재생'}
          aria-label={isPlaying ? '동영상 일시정지' : '동영상 재생'}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          className={`${videoPlayerControlPanelStyle.panelButton} ${videoPlayerControlPanelStyle.volumeButton}`}
          onClick={handleMuteVolume}
          title={isMuted || volume === 0 ? '음소거 해제' : '음소거'}
          aria-label={isMuted || volume === 0 ? '음소거 해제' : '음소거'}
        >
          {isMuted || volume === 0 ? <VolumeMuteIcon /> : <VolumeIcon />}
        </button>
        <div className={videoPlayerControlPanelStyle.volumeSlider}>
          <Slider
            name="음량 조절"
            min={0}
            max={1}
            step={0.05}
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
        <button
          className={`${videoPlayerControlPanelStyle.panelButton} ${videoPlayerControlPanelStyle.fullscreenButton}`}
          onClick={handleFullscreen}
          title={isFullscreen ? '전체 화면 해제' : '전체 화면으로 전환'}
          aria-label={isFullscreen ? '전체 화면 해제' : '전체 화면으로 전환'}
        >
          {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
        </button>
      </div>
    </div>
  );
}
