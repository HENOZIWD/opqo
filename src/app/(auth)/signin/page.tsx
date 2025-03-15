'use client';

import CustomInput from '@/components/customInput/component';
import styles from './page.module.css';
import CustomButton from '@/components/customButton/component';
import { SigninContent } from '@/utils/type';
import { ERR_MSG_EMPTY_PASSWORD, ERR_MSG_EMPTY_PHONENUMBER, ERR_MSG_INTERNAL_SERVER, ERR_MSG_INVALID_USER } from '@/utils/message';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signin } from '@/apis/user';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SigninPage() {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<SigninContent>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  useEffect(() => {
    fetchHandler(() => axios.head<void>(`${process.env.NEXT_PUBLIC_SERVER_URL}/token`, { withCredentials: true }), {
      onSuccess: () => {
        router.replace('/');
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  }, []);

  const handleSignin = (data: SigninContent) => {
    fetchHandler((controller) => signin({
      phoneNumber: data.phoneNumber,
      password: data.password,
      controller,
    }), {
      onSuccess: () => { router.push('/selectChannel'); },
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

  if (isLoading) {
    return null;
  }

  return (
    <main>
      <h1 className={styles.title}>로그인</h1>
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
    </main>
  );
}
