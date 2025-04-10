import VideoCard from '@/components/videoCard/component';
import axios from 'axios';

interface VideoCardFetcherProps {
  videoId: string;
  videoTitle: string;
  createdDate: string;
  channelInfo?: {
    channelId: string;
    channelName: string;
  };
}

export default async function VideoCardFetcher({
  videoId,
  videoTitle,
  createdDate,
  channelInfo,
}: VideoCardFetcherProps) {
  const data = (await axios.head(`${process.env.NEXT_PUBLIC_CDN_VIDEO_URL}/${videoId}`)).headers['opc-meta-duration'];

  if (!data) {
    return null;
  }

  return (
    <VideoCard
      videoId={videoId}
      videoTitle={videoTitle}
      videoDuration={data}
      createdDate={createdDate}
      channelInfo={channelInfo}
    />
  );
}
