import { ChangeEvent, RefObject, useState } from 'react';
import styles from './style.module.css';
import PauseIcon from '@/icons/pauseIcon';
import PlayIcon from '@/icons/playIcon';
import FullscreenIcon from '@/icons/fullscreenIcon';
import VolumeIcon from '@/icons/volumeIcon';
import VolumeMuteIcon from '@/icons/volumeMuteIcon';

interface VideoPlayerControlPanelProps {
  containerRef: RefObject<HTMLElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
}

export default function VideoPlayerControlPanel({
  containerRef,
  videoRef,
  isPlaying,
}: VideoPlayerControlPanelProps) {
  const [volume, setVolume] = useState<number>(0.5);
  const [isMuted, setIsMuted] = useState<boolean>(false);

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

  const handleVolumeMute = () => {
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

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    }
    else {
      document.exitFullscreen();
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.panelButton} ${styles.playPauseButton}`}
        onClick={handlePlayPause}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button
        className={`${styles.panelButton} ${styles.volumeButton}`}
        onClick={handleVolumeMute}
      >
        {isMuted || volume === 0 ? <VolumeMuteIcon /> : <VolumeIcon />}
      </button>
      <input
        className={styles.volumeSlider}
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
      />
      <div>
        {isMuted ? 0 : (volume * 100).toFixed(0)}
      </div>
      <button
        className={`${styles.panelButton} ${styles.fullscreenButton}`}
        onClick={handleFullScreen}
      >
        <FullscreenIcon />
      </button>
    </div>
  );
}
