import { fetchInstance } from './instance';
import { FETCH_CACHE_POLICY } from '@/utils/constant';

interface GetVideoInfoParams { videoId: string }
interface GetVideoInfoResponse {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  channel: {
    id: string;
    name: string;
  };
  video: {
    width: number;
    height: number;
    duration: number;
  };
}

export async function getVideoInfo({ videoId }: GetVideoInfoParams) {
  return fetchInstance.get<GetVideoInfoResponse>(`contents/${videoId}`, FETCH_CACHE_POLICY);
}
