'use client';

import { useRef, useState } from 'react';
import styles from './style.module.css';
import VideoPlayerControlPanel from '../videoPlayerControlPanel/component';
import { debounce } from '@/utils/debounce';
import Spinner from '../spinner/component';

interface VideoPlayerProps {
  source: string;
  title: string;
  thumbnail?: string;
}

export default function VideoPlayer({
  source,
  title,
  thumbnail,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPanelShown, setIsPanelShown] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [bufferedProgress, setBufferedProgress] = useState<number>(0);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);

  const debouncedHidePanelRef = useRef(debounce(() => setIsPanelShown(false), 3000));

  const handleShowPanel = () => {
    if (!isPanelShown) {
      setIsPanelShown(true);
    }

    debouncedHidePanelRef.current();
  };

  const handleBufferProgress = () => {
    if (!videoRef.current) {
      return;
    }

    if (videoRef.current.duration > 0) {
      for (let i = 0; i < videoRef.current.buffered.length; i += 1) {
        if (videoRef.current.buffered.start(videoRef.current.buffered.length - 1 - i)
          < videoRef.current.currentTime) {
          setBufferedProgress((videoRef.current.buffered.end(videoRef.current.buffered.length - 1 - i) * 100)
            / videoRef.current.duration);
          break;
        }
      }
    }
  };

  return (
    <figure
      className={`${styles.container}${isPanelShown ? '' : ` ${styles.mouseHidden}`}`}
      ref={containerRef}
      onMouseMove={handleShowPanel}
      onMouseLeave={() => setIsPanelShown(false)}
    >
      <video
        key={source}
        className={styles.video}
        ref={videoRef}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onProgress={handleBufferProgress}
        controls={false}
        poster={thumbnail}
        onWaiting={() => setIsBuffering(true)}
        onCanPlay={() => setIsBuffering(false)}
        playsInline
        preload="metadata"
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
          duration={duration}
          setIsPlaying={setIsPlaying}
          setCurrentTime={setCurrentTime}
          bufferedProgress={bufferedProgress}
        />
      </div>
      {isBuffering
        ? (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )
        : null}
    </figure>
  );
}
