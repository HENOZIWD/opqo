import { fetchInstance } from '@/apis/instance';
import { FETCH_CACHE_POLICY } from '@/utils/constant';

interface GetChannelInfoParams { channelId: string }
interface GetChannelInfoResponse {
  id: string;
  name: string;
  description: string;
  createdDate: string;
}

export async function getChannelInfo({ channelId }: GetChannelInfoParams) {
  return fetchInstance.get<GetChannelInfoResponse>(`channels/${channelId}`, FETCH_CACHE_POLICY);
}
