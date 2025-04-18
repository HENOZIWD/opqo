'use client';

import styles from './style.module.css';
import CustomInput from '@/components/customInput/component';
import CustomButton from '@/components/customButton/component';
import { SigninContent } from '@/utils/type';
import { ERR_MSG_EMPTY_PASSWORD, ERR_MSG_EMPTY_PHONENUMBER, ERR_MSG_INTERNAL_SERVER, ERR_MSG_INVALID_USER, ERR_MSG_SIGNIN_FAILED } from '@/utils/message';
import { useForm } from 'react-hook-form';
import { signin } from '@/apis/user';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import { setAccessTokenCookie } from '@/serverActions/token';
import { parseJwt } from '@/utils/token';
import { ROLE_USER } from '@/utils/constant';

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<SigninContent>();

  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  const handleSignin = (data: SigninContent) => {
    fetchHandler(({ controller }) => signin({
      phoneNumber: data.phoneNumber,
      password: data.password,
      controller,
    }), {
      onSuccess: async (response) => {
        const accessToken = response?.data.accessToken;

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
        if (error?.status === 401) {
          showToast({
            message: ERR_MSG_INVALID_USER,
            type: 'error',
          });
        }
        else {
          showToast({
            message: ERR_MSG_INTERNAL_SERVER,
            type: 'error',
          });
        }
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => { handleSignin(data); })}
      className={styles.form}
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
      {formState?.errors?.phoneNumber && <div className={styles.error}>{formState.errors.phoneNumber?.message}</div>}
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
      {formState?.errors?.password && <div className={styles.error}>{formState.errors.password?.message}</div>}
      <div className={styles.submit}>
        <CustomButton
          type="submit"
          content="로그인"
        />
      </div>
    </form>
  );
}
