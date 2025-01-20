'use client';

import CustomInput from '@/components/customInput/component';
import styles from './page.module.css';
import CustomButton from '@/components/customButton/component';
import { SigninContent } from '@/utils/type';
import { ERR_MSG_EMPTY_PASSWORD, ERR_MSG_EMPTY_PHONENUMBER } from '@/utils/message';
import { useForm } from 'react-hook-form';
import { fetchHandler } from '@/utils/fetchHandler';
import { useRouter } from 'next/navigation';
import { signin } from '@/apis/user';

export default function SigninPage() {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<SigninContent>();

  const router = useRouter();

  const handleSignin = (data: SigninContent) => {
    fetchHandler(() => signin(data), {
      onSuccess: () => { router.push('/'); },
      onError: () => { },
    });
  };

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
