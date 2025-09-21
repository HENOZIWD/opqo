import { FETCH_CACHE_POLICY } from '@/apis/constant';
import { fetchInstance } from '@/apis/instance';

interface GetLiveStreamListResponse {
  userId: string;
  isStreaming: boolean;
  streamStartDate: string;
  title: string;
  viewerCount: number;
  user: {
    id: string;
    name: string;
    picture: string;
  };
}

export async function getLiveStreamList() {
  return fetchInstance.get<GetLiveStreamListResponse[]>('liveStreamList', FETCH_CACHE_POLICY);
}
