import { fetchInstance } from '@/apis/instance';
import { FETCH_CACHE_POLICY } from '@/apis/constant';
import { AuthenticationParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';

interface Video {
  id: string;
  title: string;
  createdDate: string;
  duration: number;
  watchProgress?: number;
}

interface GetChannelVideoListParams extends AuthenticationParams { channelId: string }
interface GetChannelVideoListResponse {
  streamingInfo: {
    userId: string;
    title: string;
    isStreaming: boolean;
    streamStartDate: Date;
    viewerCount: number;
  };
  videoList: Video[];
}

export async function getChannelVideoList({
  channelId,
  accessToken,
}: GetChannelVideoListParams) {
  return fetchInstance.get<GetChannelVideoListResponse>(
    `channel/${channelId}/videoList`,
    {
      headers: { Authorization: accessTokenToBearer(accessToken) },
      ...FETCH_CACHE_POLICY,
    },
  );
}
