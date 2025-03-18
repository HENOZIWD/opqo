import { ChangeEvent, Dispatch, RefObject, SetStateAction, useState } from 'react';
import styles from './style.module.css';
import PauseIcon from '@/icons/pauseIcon';
import PlayIcon from '@/icons/playIcon';
import FullscreenIcon from '@/icons/fullscreenIcon';
import VolumeIcon from '@/icons/volumeIcon';
import VolumeMuteIcon from '@/icons/volumeMuteIcon';
import ExitFullscreenIcon from '@/icons/exitFullscreenIcon';
import { numberToTime } from '@/utils/time';
import Slider from '../slider/component';

interface VideoPlayerControlPanelProps {
  containerRef: RefObject<HTMLElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  setIsSeeking: Dispatch<SetStateAction<boolean>>;
  bufferedProgress: number;
}

export default function VideoPlayerControlPanel({
  containerRef,
  videoRef,
  isPlaying,
  currentTime,
  duration,
  setCurrentTime,
  setIsSeeking,
  bufferedProgress,
}: VideoPlayerControlPanelProps) {
  const [volume, setVolume] = useState<number>(0.5);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) {
      return;
    }

    const value = Number(e.target.value);

    videoRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const handlePlayPause = () => {
    if (!videoRef.current) {
      return;
    }

    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
    }
    else {
      videoRef.current.pause();
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
    <div className={styles.container}>
      <Slider
        min={0}
        max={duration}
        step="any"
        value={currentTime}
        mid={bufferedProgress}
        onChange={handleSeek}
        mouseDownAction={() => setIsSeeking(true)}
        mouseUpAction={() => setIsSeeking(false)}
      />
      <div className={styles.panel}>
        <button
          className={`${styles.panelButton} ${styles.playPauseButton}`}
          onClick={handlePlayPause}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          className={`${styles.panelButton} ${styles.volumeButton}`}
          onClick={handleMuteVolume}
        >
          {isMuted || volume === 0 ? <VolumeMuteIcon /> : <VolumeIcon />}
        </button>
        <div className={styles.volumeSlider}>
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
          className={`${styles.panelButton} ${styles.fullscreenButton}`}
          onClick={handleFullScreen}
        >
          {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
        </button>
      </div>
    </div>
  );
}
