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
  containerRef: RefObject<HTMLElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  bufferedProgress: number;
}

export default function VideoPlayerControlPanel({
  containerRef,
  videoRef,
  isPlaying,
  currentTime,
  duration,
  setIsPlaying,
  setCurrentTime,
  bufferedProgress,
}: VideoPlayerControlPanelProps) {
  const [volume, setVolume] = useState<number>(0.5);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const playPromiseRef = useRef<Promise<void>>(null);
  const isPlayingBeforeSeek = useRef<boolean>(null);
  const throttledHandleSeekRef = useRef(throttle((e: ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) {
      return;
    }

    const value = Number(e.target.value);

    videoRef.current.currentTime = value;
    setCurrentTime(value);
  }, 50));

  const playVideo = () => {
    if (!videoRef.current) {
      return;
    }

    if (playPromiseRef.current) {
      return;
    }

    const playPromise = videoRef.current.play();

    if (playPromise !== undefined) {
      playPromiseRef.current = playPromise;

      playPromise.then(() => {
        playPromiseRef.current = null;
      }).catch(() => {
        setIsPlaying(false);
        playPromiseRef.current = null;
      });
    }
  };

  const pauseVideo = () => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.pause();
  };

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

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseVideo();
    }
    else {
      playVideo();
    }
  };

  const handleMuteVolume = () => {
    if (!videoRef.current) {
      return;
    }

    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
    else {
      videoRef.current.muted = true;
      setIsMuted(true);
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

  const handleFullScreen = () => {
    if (!containerRef.current) {
      return;
    }

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    }
    else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className={videoPlayerControlPanelStyle.container}>
      <Slider
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
          onClick={handleFullScreen}
          title={isFullscreen ? '전체 화면 해제' : '전체 화면으로 전환'}
          aria-label={isFullscreen ? '전체 화면 해제' : '전체 화면으로 전환'}
        >
          {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
        </button>
      </div>
    </div>
  );
}
