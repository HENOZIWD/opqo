'use client';

import CustomButton from '@/components/customButton/component';
import { SignupContent } from '@/utils/type';
import { useForm } from 'react-hook-form';
import styles from './page.module.css';
import { ERR_MSG_CONFIRMPASSWORD_NOTEQUAL, ERR_MSG_EMPTY_PHONENUMBER, ERR_MSG_PASSWORD_RULE } from '@/utils/message';
import { useEffect, useState } from 'react';
import { fetchHandler } from '@/utils/fetchHandler';
import Link from 'next/link';
import CustomInput from '@/components/customInput/component';
import { REGEXP_PASSWORD } from '@/utils/regexp';
import { requestPhoneNumberVerificationCode, signup, validatePhoneNumberVerificationCode } from '@/apis/user';

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState,
    getValues,
  } = useForm<SignupContent>();

  const {
    register: verificationRegister,
    handleSubmit: handleVerificationSubmit,
  } = useForm<{ verificationCode: string }>();

  const [signupStep, setSignupStep] = useState<number>(0);
  const [signupValue, setSignupValue] = useState<SignupContent | null>(null);

  const [remainTime, setRemainTime] = useState<number>(300);

  useEffect(() => {
    if (signupStep === 1 && remainTime > 0) {
      const interval = setInterval(() => {
        setRemainTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [signupStep, remainTime]);

  const handleRequestVerificationCode = (data: SignupContent) => {
    if (signupStep === 0) {
      fetchHandler(() => requestPhoneNumberVerificationCode(data.phoneNumber), {
        onSuccess: () => {
          setSignupValue({
            phoneNumber: data.phoneNumber,
            password: data.password,
            confirmPassword: data.confirmPassword,
          });
          setSignupStep(1);
        },
        onError: () => { },
      });
    }
  };

  const handleValidateVerificationCode = (data: { verificationCode: string }) => {
    if (signupStep === 1 && signupValue !== null) {
      fetchHandler(() => validatePhoneNumberVerificationCode(data.verificationCode), {
        onSuccess: () => {
          fetchHandler(() => signup(signupValue), {
            onSuccess: () => {
              setSignupStep(2);
            },
            onError: () => { },
          });
        },
        onError: () => { },
      });
    }
  };

  if (signupStep === 2) {
    return (
      <main>
        <div className={styles.finishTitle}>회원가입 완료</div>
        <div className={styles.welcome}>환영합니다!</div>
        <div className={styles.link}>
          <Link href="/">메인 화면으로</Link>
          <Link href="/signin">로그인</Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1 className={styles.title}>회원가입</h1>
      <form
        onSubmit={handleSubmit((data) => { handleRequestVerificationCode(data); })}
        className={styles.form}
      >
        <label
          htmlFor="phoneNumber"
          className={styles.label}
        >
          휴대전화
        </label>
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
          disabled={signupStep === 1}
        />
        {formState?.errors?.phoneNumber && <div className={styles.error}>{formState.errors.phoneNumber?.message}</div>}
        <label
          htmlFor="password"
          className={styles.label}
        >
          비밀번호
        </label>
        <CustomInput
          id="password"
          type="password"
          {...register('password', {
            required: {
              value: true,
              message: ERR_MSG_PASSWORD_RULE,
            },
            pattern: {
              value: REGEXP_PASSWORD,
              message: ERR_MSG_PASSWORD_RULE,
            },
          })}
          error={formState?.errors?.password !== undefined}
          disabled={signupStep === 1}
        />
        {formState?.errors?.password && <div className={styles.error}>{formState.errors.password?.message}</div>}
        <label
          htmlFor="confirmPassword"
          className={styles.label}
        >
          비밀번호 확인
        </label>
        <CustomInput
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', {
            validate: {
              valueisEqual: (value) => value === getValues('password')
                || ERR_MSG_CONFIRMPASSWORD_NOTEQUAL,
            },
          })}
          error={formState?.errors?.confirmPassword !== undefined}
          disabled={signupStep === 1}
        />
        {formState?.errors?.confirmPassword && <div className={styles.error}>{formState.errors.confirmPassword?.message}</div>}
        {signupStep === 0 && (
          <div className={styles.submit}>
            <CustomButton
              type="submit"
              content="다음"
            />
          </div>
        )}
      </form>
      {signupStep === 1 && (
        <form
          onSubmit={handleVerificationSubmit((data) => { handleValidateVerificationCode(data); })}
          className={styles.form}
        >
          <label
            htmlFor="verificationCode"
            className={styles.label}
          >
            인증번호
          </label>
          <div className={styles.verificationCode}>
            <CustomInput
              id="verificationCode"
              type="text"
              inputMode="numeric"
              {...verificationRegister('verificationCode')}
            />
            <div className={styles.timer}>
              {(remainTime / 60) >> 0}
              :
              {(remainTime % 60).toString().padStart(2, '0')}
            </div>
            <CustomButton
              type="button"
              content="인증번호 재전송"
              clickAction={() => { setRemainTime(300); }}
            />
          </div>
          <div className={styles.submit}>
            <CustomButton
              type="submit"
              content="완료"
            />
          </div>
        </form>
      )}
    </main>
  );
}
