import { fetchInstance } from '@/apis/instance';
import { FetchParams } from '@/apis/type';
import { CONTENT_TYPE_APPLICATION_JSON } from '@/utils/constant';

interface RequestVerificationCodeParams extends FetchParams { phoneNumber: string }

export async function requestVerificationCode({
  phoneNumber,
  controller,
}: RequestVerificationCodeParams) {
  return fetchInstance.post<void>('phone-auth', {
    json: { phoneNumber },
    signal: controller.signal,
    headers: { 'Content-Type': CONTENT_TYPE_APPLICATION_JSON },
  });
}
