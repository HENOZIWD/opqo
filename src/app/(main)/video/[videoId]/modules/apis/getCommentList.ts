import { FETCH_CACHE_POLICY } from '@/apis/constant';
import { fetchInstance } from '@/apis/instance';
import { AuthenticationParams } from '@/apis/type';
import { accessTokenToBearer } from '@/utils/token';
import { Comment } from '../utils/type';

interface GetCommentListParams extends AuthenticationParams { videoId: string }
interface GetCommentListResponse {
  count: number;
  data: Comment[];
}

export async function getCommentList({
  videoId,
  accessToken,
}: GetCommentListParams) {
  return fetchInstance.get<GetCommentListResponse>(`comment/${videoId}`, {
    headers: { Authorization: accessTokenToBearer(accessToken) },
    ...FETCH_CACHE_POLICY,
  });
}
