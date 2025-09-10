import { fetchInstance } from '@/apis/instance';
import { LiveStreamInfo } from '../utils/type';

interface GetLiveSteramInfoParams { channelId: string }
type GetLiveStreamInfoResponse = LiveStreamInfo;

export async function getLiveStreamInfo({ channelId }: GetLiveSteramInfoParams) {
  return fetchInstance.get<GetLiveStreamInfoResponse>(`liveStream/${channelId}`);
}
