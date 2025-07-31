'use client';

import { KeyboardEvent, useEffect, useRef } from 'react';
import { debounce } from '@/utils/debounce';
import Spinner from './spinner';
import VideoPlayerControlPanel from './videoPlayerControlPanel';
import Hls from 'hls.js';
import { videoPlayerStyle } from '@/styles/video/videoPlayerStyle.css';
import { useVideoPlayerState } from '@/hooks/useVideoPlayerState';

interface VideoPlayerProps {
  source: string;
  title: string;
  thumbnail?: string;
  duration: number;
  hlsMode?: boolean;
}

export default function VideoPlayer({
  source,
  title,
  thumbnail,
  duration,
  hlsMode = false,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void>>(null);

  const {
    isPanelShown,
    setIsPanelShown,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    setBufferedProgress,
    isBuffering,
    setIsBuffering,
    isMuted,
    setIsMuted,
    setIsFullscreen,
    volume,
    setVolume,
    currentResolutionLevel,
    setResolutionLevels,
  } = useVideoPlayerState();

  const debouncedHidePanelRef = useRef(debounce(() => setIsPanelShown(false), 3000));

  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (hlsMode && !video.canPlayType('application/vnd.apple.mpegurl') && Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;

      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        const levels = data.levels.map(({
          width,
          height,
        }, index) => ({
          level: index,
          name: `${width > height ? height : width}`,
        }));

        levels.sort((a, b) => b.level - a.level);

        setResolutionLevels(levels);
      });
    }
    else {
      video.src = source;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!hlsRef.current || !videoRef.current) {
      return;
    }

    hlsRef.current.currentLevel = currentResolutionLevel.level;
  }, [currentResolutionLevel]);

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
          <= videoRef.current.currentTime) {
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

  const handleVolumeUpdown = (dir: 'UP' | 'DOWN') => {
    if (!videoRef.current) {
      return;
    }

    const currentVolume = isMuted ? 0 : volume;

    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }

    if (dir === 'UP') {
      const changedVolume = Math.min(Number.parseFloat((currentVolume + 0.05).toFixed(2)), 1);
      videoRef.current.volume = changedVolume;
      setVolume(changedVolume);
    }
    else if (dir === 'DOWN') {
      const changedVolume = Math.max(Number.parseFloat((currentVolume - 0.05).toFixed(2)), 0);
      videoRef.current.volume = changedVolume;
      setVolume(changedVolume);
    }
  };

  const handleSkipTime = (dir: 'BACKWARD' | 'FORWARD') => {
    if (!videoRef.current) {
      return;
    }

    if (dir === 'FORWARD') {
      const changedTime = Math.max(currentTime - 5, 0);
      videoRef.current.currentTime = changedTime;
      setCurrentTime(changedTime);
    }
    else if (dir === 'BACKWARD') {
      const changedTime = Math.min(currentTime + 5, duration);
      videoRef.current.currentTime = changedTime;
      setCurrentTime(changedTime);
    }
  };

  const handleShortcut = (e: KeyboardEvent<HTMLElement>) => {
    const key = e.key.toLowerCase();
    const preventDefaultKeys = [' ', 'm', 'f', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
    const showPanelKeys = [...preventDefaultKeys, 'tab', 'enter'];

    if (preventDefaultKeys.includes(key)) {
      e.preventDefault();
    }

    if (showPanelKeys.includes(key)) {
      handleShowPanel();
    }

    switch (key) {
      case ' ': {
        handlePlayPause();
        break;
      }

      case 'm': {
        handleMuteVolume();
        break;
      }

      case 'f': {
        handleFullscreen();
        break;
      }

      case 'arrowup': {
        handleVolumeUpdown('UP');
        break;
      }

      case 'arrowdown': {
        handleVolumeUpdown('DOWN');
        break;
      }

      case 'arrowleft': {
        handleSkipTime('FORWARD');
        break;
      }

      case 'arrowright': {
        handleSkipTime('BACKWARD');
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
        autoPlay
      />
      <figcaption className={`${videoPlayerStyle.title}${isPanelShown ? '' : ` ${videoPlayerStyle.hidden}`}`}>
        {title}
      </figcaption>
      <div className={`${videoPlayerStyle.panel}${isPanelShown ? '' : ` ${videoPlayerStyle.hidden}`}`}>
        <VideoPlayerControlPanel
          videoRef={videoRef}
          duration={duration}
          playVideo={playVideo}
          pauseVideo={pauseVideo}
          handleMuteVolume={handleMuteVolume}
          handleFullscreen={handleFullscreen}
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
