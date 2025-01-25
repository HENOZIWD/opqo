'use client';

import { useRef, useState } from 'react';
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
        />
      </div>
    </figure>
  );
}
