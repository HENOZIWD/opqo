'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import VideoPlayerControlPanel from '../videoPlayerControlPanel/component';
import { debounce } from '@/utils/debounce';

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
  const [duration, setDuration] = useState<number>(0);
  const [bufferedProgress, setBufferedProgress] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [isPausedBeforeSeek, setIsPausedBeforeSeek] = useState<boolean>(true);

  const debouncedHidePanelRef = useRef(debounce(() => setIsPanelShown(false), 3000));

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
          duration={duration}
          setCurrentTime={setCurrentTime}
          setIsSeeking={setIsSeeking}
          bufferedProgress={bufferedProgress}
        />
      </div>
    </figure>
  );
}
