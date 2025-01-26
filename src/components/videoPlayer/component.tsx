'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import VideoPlayerControlPanel from '../videoPlayerControlPanel/component';

interface VideoPlayerProps {
  source: string;
  title: string;
}

export default function VideoPlayer({
  source,
  title,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPanelShown, setIsPanelShown] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [isPausedBeforeSeek, setIsPausedBeforeSeek] = useState<boolean>(true);

  useEffect(() => {
    if (!isSeeking) {
      setIsPausedBeforeSeek(!isPlaying);
    }
  }, [isSeeking, isPlaying]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    if (isSeeking) {
      videoRef.current.pause();
    }
    else if (!isPausedBeforeSeek) {
      videoRef.current.play();
    }
  }, [isSeeking, isPausedBeforeSeek]);

  const handleShowPanel = () => {
    setIsPanelShown(true);
  };

  const handleHidePanel = () => {
    setIsPanelShown(false);
  };

  return (
    <figure
      className={styles.container}
      ref={containerRef}
      onMouseEnter={handleShowPanel}
      onMouseLeave={handleHidePanel}
    >
      <video
        className={styles.video}
        ref={videoRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        controls={false}
        playsInline
      >
        <source src={source} />
      </video>
      <figcaption className={`${styles.title}${isPanelShown ? '' : ` ${styles.hidden}`}`}>
        {title}
      </figcaption>
      <div className={`${styles.panel}${isPanelShown ? '' : ` ${styles.hidden}`}`}>
        <VideoPlayerControlPanel
          containerRef={containerRef}
          videoRef={videoRef}
          isPlaying={isPlaying}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setIsSeeking={setIsSeeking}
        />
      </div>
    </figure>
  );
}
