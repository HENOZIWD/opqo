import { fetchInstance } from '@/apis/instance';
import { FETCH_CACHE_POLICY } from '@/utils/constant';

interface GetChannelVideoListParams { channelId: string }
interface GetChannelVideoListResponse {
  id: string;
  title: string;
  createdDate: string;
  duration: number;
}

export async function getChannelVideoList({ channelId }: GetChannelVideoListParams) {
  return fetchInstance.get<GetChannelVideoListResponse[]>(`channels/${channelId}/contents`, FETCH_CACHE_POLICY);
}
