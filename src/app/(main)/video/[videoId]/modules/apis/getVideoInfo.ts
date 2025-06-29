import { fetchInstance } from '@/apis/instance';
import { FETCH_CACHE_POLICY } from '@/utils/constant';

interface GetVideoInfoParams { videoId: string }
interface GetVideoInfoResponse {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  duration: number;
  channel: {
    id: string;
    name: string;
    picture: string;
  };
}

export async function getVideoInfo({ videoId }: GetVideoInfoParams) {
  return fetchInstance.get<GetVideoInfoResponse>(`video/${videoId}`, FETCH_CACHE_POLICY);
}
