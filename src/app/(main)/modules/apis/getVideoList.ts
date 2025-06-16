import { fetchInstance } from '@/apis/instance';
import { FETCH_CACHE_POLICY } from '@/utils/constant';

interface GetVideoListParams { category: string }
interface GetVideoListResponse {
  id: string;
  title: string;
  createdDate: string;
  duration: number;
  channel: {
    id: string;
    name: string;
  };
}

export async function getVideoList({ category }: GetVideoListParams) {
  return fetchInstance.get<GetVideoListResponse[]>(`contents?view=${category}`, FETCH_CACHE_POLICY);
}
