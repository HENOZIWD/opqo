'use client';

import { KeyboardEvent, useRef, useState } from 'react';
import { debounce } from '@/utils/debounce';
import Spinner from './spinner';
import { videoPlayerStyle } from '@/styles/video.css';
import VideoPlayerControlPanel from './videoPlayerControlPanel';

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
  const playPromiseRef = useRef<Promise<void>>(null);

  const [isPanelShown, setIsPanelShown] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [bufferedProgress, setBufferedProgress] = useState<number>(0);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

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

  const handleFullscreen = () => {
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

  const handleShortcut = (e: KeyboardEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    switch (e.key.toLowerCase()) {
      case ' ': {
        handlePlayPause();
        break;
      }

      case 'm': {
        handleMuteVolume();
        break;
      }

      case 'enter': {
        handleFullscreen();
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <figure
      className={`${videoPlayerStyle.container}${isPanelShown ? '' : ` ${videoPlayerStyle.mouseHidden}`}`}
      ref={containerRef}
      onMouseMove={handleShowPanel}
      onMouseLeave={() => setIsPanelShown(false)}
      tabIndex={0}
      onKeyDown={handleShortcut}
    >
      <video
        key={source}
        className={videoPlayerStyle.video}
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
      <figcaption className={`${videoPlayerStyle.title}${isPanelShown ? '' : ` ${videoPlayerStyle.hidden}`}`}>
        {title}
      </figcaption>
      <div className={`${videoPlayerStyle.panel}${isPanelShown ? '' : ` ${videoPlayerStyle.hidden}`}`}>
        <VideoPlayerControlPanel
          videoRef={videoRef}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          setCurrentTime={setCurrentTime}
          bufferedProgress={bufferedProgress}
          playVideo={playVideo}
          pauseVideo={pauseVideo}
          handleMuteVolume={handleMuteVolume}
          handleFullscreen={handleFullscreen}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          isFullscreen={isFullscreen}
          handlePlayPause={handlePlayPause}
        />
      </div>
      {isBuffering
        ? (
          <div className={videoPlayerStyle.spinner}>
            <Spinner />
          </div>
        )
        : null}
    </figure>
  );
}
