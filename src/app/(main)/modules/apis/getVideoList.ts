import { fetchInstance } from '@/apis/instance';
import { FETCH_CACHE_POLICY } from '@/apis/constant';

interface GetVideoListResponse {
  id: string;
  title: string;
  createdDate: string;
  duration: number;
  channel: {
    id: string;
    name: string;
    picture: string;
  };
}

export async function getVideoList() {
  return fetchInstance.get<GetVideoListResponse[]>(`videoList`, FETCH_CACHE_POLICY);
}
