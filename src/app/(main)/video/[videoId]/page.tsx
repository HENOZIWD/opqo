'use client';

import VideoFetcher from '@/fetcher/videoFetcher/component';
import { useParams } from 'next/navigation';

export default function VideoPage() {
  const { videoId } = useParams<{ videoId: string }>();

  return (
    <main>
      <VideoFetcher videoId={videoId} />
    </main>
  );
}
