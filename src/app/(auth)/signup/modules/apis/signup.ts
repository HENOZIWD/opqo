import { fetchInstance } from '@/apis/instance';
import { FetchParams } from '@/apis/type';
import { CONTENT_TYPE_APPLICATION_JSON } from '@/utils/constant';

interface SignupParams extends FetchParams {
  phoneNumber: string;
  password: string;
  authCode: string;
}

export async function signup({
  phoneNumber,
  password,
  authCode,
  controller,
}: SignupParams) {
  return fetchInstance.post<void>('users', {
    json: {
      phoneNumber,
      password,
      authCode,
    },
    signal: controller.signal,
    headers: { 'Content-Type': CONTENT_TYPE_APPLICATION_JSON },
  });
}
