import { fetchInstance } from '@/apis/instance';
import { FETCH_CACHE_POLICY } from '@/apis/constant';

interface GetChannelInfoParams { channelId: string }
interface GetChannelInfoResponse {
  id: string;
  email: string;
  name: string;
  description: string;
  createdDate: string;
  picture: string;
}

export async function getChannelInfo({ channelId }: GetChannelInfoParams) {
  return fetchInstance.get<GetChannelInfoResponse>(`channel/${channelId}`, FETCH_CACHE_POLICY);
}
