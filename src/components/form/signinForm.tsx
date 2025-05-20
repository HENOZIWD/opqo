'use client';

import CustomInput from '@/components/common/customInput';
import CustomButton from '@/components/common/customButton';
import { SigninContent } from '@/utils/type';
import { ERR_MSG_EMPTY_PASSWORD, ERR_MSG_EMPTY_PHONENUMBER, ERR_MSG_INVALID_USER, ERR_MSG_SIGNIN_FAILED } from '@/utils/message';
import { useForm } from 'react-hook-form';
import { signin } from '@/apis/user';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import { setAccessTokenCookie } from '@/serverActions/token';
import { parseJwt } from '@/utils/token';
import { ROLE_USER } from '@/utils/constant';
import { formStyle } from '@/styles/form.css';
import { useDefaultError } from '@/hooks/useDefaultError';
import { TimeoutError } from 'ky';

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<SigninContent>();

  const { fetchHandler } = useFetch();
  const { showToast } = useToast();
  const {
    handleDefaultError,
    handleTimeoutError,
  } = useDefaultError();

  const handleSignin = (data: SigninContent) => {
    fetchHandler(({ controller }) => signin({
      phoneNumber: data.phoneNumber,
      password: data.password,
      controller,
    }), {
      onSuccess: async (response) => {
        const accessToken = (await response?.json())?.accessToken;

        if (!accessToken) {
          showToast({
            message: ERR_MSG_SIGNIN_FAILED,
            type: 'error',
          });

          return;
        }

        const userData = parseJwt(accessToken);

        if (!userData) {
          showToast({
            message: ERR_MSG_SIGNIN_FAILED,
            type: 'error',
          });

          return;
        }

        await setAccessTokenCookie({
          accessToken,
          expUnixTimeStamp: userData.exp,
        });

        if (userData.role === ROLE_USER) {
          window.location.replace('/selectChannel');

          return;
        }

        window.location.replace('/');
      },
      onError: (error) => {
        if (error instanceof TimeoutError) {
          handleTimeoutError();
        }
        else if (error?.status === 400 || error?.status === 401) {
          showToast({
            message: ERR_MSG_INVALID_USER,
            type: 'error',
          });
        }
        else {
          handleDefaultError(error?.status);
        }
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => { handleSignin(data); })}
      className={formStyle.container}
    >
      <label htmlFor="phoneNumber">휴대전화</label>
      <CustomInput
        id="phoneNumber"
        type="text"
        inputMode="numeric"
        {...register('phoneNumber', {
          required: {
            value: true,
            message: ERR_MSG_EMPTY_PHONENUMBER,
          },
        })}
        error={formState?.errors?.phoneNumber !== undefined}
      />
      {formState?.errors?.phoneNumber && <div className={formStyle.error}>{formState.errors.phoneNumber?.message}</div>}
      <label htmlFor="password">비밀번호</label>
      <CustomInput
        id="password"
        type="password"
        {...register('password', {
          required: {
            value: true,
            message: ERR_MSG_EMPTY_PASSWORD,
          },
        })}
        error={formState?.errors?.password != undefined}
      />
      {formState?.errors?.password && <div className={formStyle.error}>{formState.errors.password?.message}</div>}
      <div className={formStyle.submit}>
        <CustomButton
          type="submit"
          content="로그인"
        />
      </div>
    </form>
  );
}
