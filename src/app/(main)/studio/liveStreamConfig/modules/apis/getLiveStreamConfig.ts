import { AuthenticationParams } from '@/apis/type';
import { LiveStreamConfig } from '../utils/type';
import { fetchInstance } from '@/apis/instance';
import { accessTokenToBearer } from '@/utils/token';

interface GetLiveStreamParams extends AuthenticationParams {}
type GetLiveStreamResponse = LiveStreamConfig;

export async function getLiveStreamConfig({ accessToken }: GetLiveStreamParams) {
  return fetchInstance.get<GetLiveStreamResponse>(
    'liveStreamConfig',
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}
