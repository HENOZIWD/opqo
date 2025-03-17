import VideoFetcher from '@/fetcher/videoFetcher/component';

export default async function VideoPage({ params }: { params: Promise<{ videoId: string }> }) {
  const { videoId } = await params;

  return (
    <main>
      <VideoFetcher videoId={videoId} />
    </main>
  );
}
