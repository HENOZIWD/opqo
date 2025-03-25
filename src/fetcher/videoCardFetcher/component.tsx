import VideoCard from '@/components/videoCard/component';
import axios from 'axios';
import useSWRImmutable from 'swr/immutable';

interface VideoCardFetcherProps {
  videoId: string;
  videoTitle: string;
  createdDate: string;
  channelInfo?: {
    channelId: string;
    channelName: string;
  };
}

export const fetcher = (url: string) => axios.head(url).then((res) => res.headers['opc-meta-duration']);

export default function VideoCardFetcher({
  videoId,
  videoTitle,
  createdDate,
  channelInfo,
}: VideoCardFetcherProps) {
  const {
    data,
    error,
  } = useSWRImmutable(`${process.env.NEXT_PUBLIC_CDN_VIDEO_URL}/${videoId}`, fetcher, { shouldRetryOnError: false });

  if (!data || error) {
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
