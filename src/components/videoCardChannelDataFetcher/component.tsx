'use client';

import { channelGETFetcher } from '@/apis/channel';
import VideoCard from '../videoCard/component';
import useSWRImmutable from 'swr/immutable';

interface VideoCardChannelDataFetcherProps {
  videoId: string;
  thumbnailUrl: string;
  videoDuration: string;
  videoTitle: string;
  uploadDate: string;
  channelId: string;
}

export default function VideoCardChannelDataFetcher({
  videoId,
  thumbnailUrl,
  videoDuration,
  videoTitle,
  uploadDate,
  channelId,
}: VideoCardChannelDataFetcherProps) {
  const { data: channelData } = useSWRImmutable(`/channel/${channelId}`, channelGETFetcher);

  if (!channelData) {
    return null;
  }

  return (
    <VideoCard
      videoId={videoId}
      thumbnailUrl={thumbnailUrl}
      videoDuration={videoDuration}
      videoTitle={videoTitle}
      uploadDate={uploadDate}
      channelInfo={{
        channelId,
        channelImageUrl: channelData.channelImageUrl,
        channelName: channelData.channelName,
      }}
    />
  );
}
