import { VideoPlayerStateAtoms } from '@/components/video/videoPlayerStateProvider';
import { useAtom } from 'jotai';

export function useVideoPlayerState() {
  const [isPanelShown, setIsPanelShown] = useAtom(VideoPlayerStateAtoms.isPanelShownAtom);
  const [isPlaying, setIsPlaying] = useAtom(VideoPlayerStateAtoms.isPlayingAtom);
  const [currentTime, setCurrentTime] = useAtom(VideoPlayerStateAtoms.currentTimeAtom);
  const [bufferedProgress, setBufferedProgress] = useAtom(VideoPlayerStateAtoms.bufferedProgressAtom);
  const [isBuffering, setIsBuffering] = useAtom(VideoPlayerStateAtoms.isBufferingAtom);
  const [isMuted, setIsMuted] = useAtom(VideoPlayerStateAtoms.isMutedAtom);
  const [isFullscreen, setIsFullscreen] = useAtom(VideoPlayerStateAtoms.isFullscreenAtom);
  const [volume, setVolume] = useAtom(VideoPlayerStateAtoms.volumeAtom);
  const [currentResolutionLevel, setCurrentResolutionLevel] = useAtom(VideoPlayerStateAtoms.currentResolutionLevelAtom);
  const [resolutionLevels, setResolutionLevels] = useAtom(VideoPlayerStateAtoms.resolutionLevelsAtom);

  return {
    isPanelShown,
    setIsPanelShown,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    bufferedProgress,
    setBufferedProgress,
    isBuffering,
    setIsBuffering,
    isMuted,
    setIsMuted,
    isFullscreen,
    setIsFullscreen,
    volume,
    setVolume,
    currentResolutionLevel,
    setCurrentResolutionLevel,
    resolutionLevels,
    setResolutionLevels,
  };
}
