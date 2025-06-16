import { fetchInstance } from '@/apis/instance';
import { FetchParams } from '@/apis/type';
import { CONTENT_TYPE_APPLICATION_JSON } from '@/utils/constant';

interface SigninParams extends FetchParams {
  phoneNumber: string;
  password: string;
}
interface SigninResponse { accessToken: string }

export async function signin({
  phoneNumber,
  password,
  controller,
}: SigninParams) {
  return fetchInstance.post<SigninResponse>('token', {
    json: {
      phoneNumber,
      password,
    },
    signal: controller.signal,
    credentials: 'include',
    headers: { 'Content-Type': CONTENT_TYPE_APPLICATION_JSON },
  });
}
