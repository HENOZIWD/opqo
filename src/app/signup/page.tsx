'use client';

import CustomButton from '@/components/customButton/component';
import { SignupContent } from '@/utils/type';
import { useForm } from 'react-hook-form';
import styles from './page.module.css';
import { ERR_MSG_CONFIRMPASSWORD_NOTEQUAL, ERR_MSG_EMPTY_PHONENUMBER, ERR_MSG_PASSWORD_RULE } from '@/utils/message';
import { useEffect, useState } from 'react';
import { fetchHandler } from '@/utils/fetchHandler';
import { requestPhoneNumberVerificationCode, signup, validatePhoneNumberVerificationCode } from '@/apis/signup';
import Link from 'next/link';

export default function Page() {
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
        onError: () => {},
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
            onError: () => {},
          });
        },
        onError: () => {},
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
        <input
          id="phoneNumber"
          className={`CustomInput${formState?.errors?.phoneNumber ? ' CustomInputError' : ''}`}
          type="text"
          inputMode="numeric"
          {...register('phoneNumber', {
            required: {
              value: true,
              message: ERR_MSG_EMPTY_PHONENUMBER,
            },
          })}
          disabled={signupStep === 1}
        />
        {formState?.errors?.phoneNumber && <div className={styles.error}>{formState.errors.phoneNumber?.message}</div>}
        <label
          htmlFor="password"
          className={styles.label}
        >
          비밀번호
        </label>
        <input
          id="password"
          className={`CustomInput${formState.errors.password ? ' CustomInputError' : ''}`}
          type="password"
          {...register('password', {
            required: {
              value: true,
              message: ERR_MSG_PASSWORD_RULE,
            },
            pattern: {
              value: /^[A-Za-z0-9`~!@#$%^&*()\-_=+\[\{\]\}\\|;:'",<.>/?]{8,20}$/,
              message: ERR_MSG_PASSWORD_RULE,
            },
          })}
          disabled={signupStep === 1}
        />
        {formState?.errors?.password && <div className={styles.error}>{formState.errors.password?.message}</div>}
        <label
          htmlFor="confirmPassword"
          className={styles.label}
        >
          비밀번호 확인
        </label>
        <input
          id="confirmPassword"
          className={`CustomInput${formState.errors.confirmPassword ? ' CustomInputError' : ''}`}
          type="password"
          {...register('confirmPassword', {
            validate: {
              valueisEqual: (value) => value === getValues('password')
                || ERR_MSG_CONFIRMPASSWORD_NOTEQUAL,
            },
          })}
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
            <input
              id="verificationCode"
              className="CustomInput"
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
