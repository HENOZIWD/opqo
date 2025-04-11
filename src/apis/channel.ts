import { accessTokenToBearer } from '@/utils/token';
import { AuthenticationParams, FetchParams } from './type';
import { fetchInstance } from './instance';

interface CreateChannelParams extends FetchParams, AuthenticationParams {
  imageFile: Blob | null;
  name: string;
  description: string;
}

export async function createChannel({
  imageFile,
  name,
  description,
  controller,
  accessToken,
}: CreateChannelParams) {
  return fetchInstance.postForm<void>('/channels', {
    profileImage: imageFile,
    name,
    description,
  }, {
    headers: { Authorization: accessTokenToBearer(accessToken) },
    signal: controller.signal,
  });
}

interface SelectChannelParams extends FetchParams, AuthenticationParams { channelId: string | null }
interface SelectChannelResponse { accessToken: string }

export async function selectChannel({
  channelId,
  controller,
  accessToken,
}: SelectChannelParams) {
  return fetchInstance.put<SelectChannelResponse>(
    `/token`,
    { channelId },
    {
      headers: { Authorization: accessTokenToBearer(accessToken) },
      signal: controller.signal,
      withCredentials: true,
    },
  );
}

interface GetChannelInfoParams { channelId: string }
interface GetChannelInfoResponse {
  id: string;
  name: string;
  description: string;
  createdDate: string;
}

export async function getChannelInfo({ channelId }: GetChannelInfoParams) {
  return fetchInstance.get<GetChannelInfoResponse>(`/channels/${channelId}`);
}

interface GetMyChannelListParams extends AuthenticationParams { }
interface GetMyChannelListResponse {
  id: string;
  name: string;
}

export async function getMyChannelList({ accessToken }: GetMyChannelListParams) {
  return fetchInstance.get<GetMyChannelListResponse[]>(
    '/users/me/channels',
    { headers: { Authorization: accessTokenToBearer(accessToken) } },
  );
}
