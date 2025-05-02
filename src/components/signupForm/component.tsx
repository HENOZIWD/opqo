'use client';

import CustomButton from '@/components/customButton/component';
import { SignupContent } from '@/utils/type';
import { useForm } from 'react-hook-form';
import {
  ERR_MSG_AUTHORIZATION_FAILED,
  ERR_MSG_CONFIRMPASSWORD_NOTEQUAL,
  ERR_MSG_DUPLICATED_PHONENUMBER,
  ERR_MSG_EMPTY_PHONENUMBER,
  ERR_MSG_EMPTY_VERIFICATIONCODE,
  ERR_MSG_INTERNAL_SERVER,
  ERR_MSG_PASSWORD_RULE,
  ERR_MSG_TOO_MANY_REQUEST,
} from '@/utils/message';
import { useState } from 'react';
import Link from 'next/link';
import CustomInput from '@/components/customInput/component';
import { REGEXP_PASSWORD } from '@/utils/regexp';
import { requestVerificationCode, signup } from '@/apis/user';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import { useCountdown } from '@/hooks/useCountdown';
import { PHONENUMBER_VALIDATION_DURATION_SECOND } from '@/utils/constant';
import { finishTitleStyle, linkListStyle, timerStyle, verificationSectionStyle, welcomeMessageStyle } from './style.css';
import { formErrorStyle, formStyle, formSubmitStyle } from '@/app/common.css';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState,
    getValues,
  } = useForm<SignupContent>();

  const {
    register: verificationRegister,
    handleSubmit: handleVerificationSubmit,
    formState: verificationFormState,
    resetField,
  } = useForm<{ verificationCode: string }>();

  const [signupStep, setSignupStep] = useState<number>(0);
  const [signupValue, setSignupValue] = useState<SignupContent | null>(null);

  const {
    count,
    setCountdown,
  } = useCountdown();
  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  const handleRequestVerificationCode = (data: SignupContent) => {
    fetchHandler(({ controller }) => requestVerificationCode({
      phoneNumber: data.phoneNumber,
      controller,
    }), {
      onSuccess: () => {
        setSignupValue({
          phoneNumber: data.phoneNumber,
          password: data.password,
          confirmPassword: data.confirmPassword,
        });
        setCountdown(PHONENUMBER_VALIDATION_DURATION_SECOND);
        setSignupStep(1);
      },
      onError: () => {
        showToast({
          message: ERR_MSG_INTERNAL_SERVER,
          type: 'error',
        });
      },
    });
  };

  const handleRefreshVerificationCode = () => {
    if (!signupValue) {
      return;
    }

    handleRequestVerificationCode(signupValue);
  };

  const handleValidateVerificationCode = (data: { verificationCode: string }) => {
    if (signupStep === 1 && signupValue) {
      fetchHandler(({ controller }) => signup({
        phoneNumber: signupValue.phoneNumber,
        password: signupValue.password,
        authCode: data.verificationCode,
        controller,
      }), {
        onSuccess: () => {
          setSignupStep(2);
        },
        onError: (error) => {
          if (error?.status === 401) {
            showToast({
              message: ERR_MSG_AUTHORIZATION_FAILED,
              type: 'error',
            });
          }
          else if (error?.status === 409) {
            showToast({
              message: ERR_MSG_DUPLICATED_PHONENUMBER,
              type: 'error',
            });
            resetField('verificationCode');
            setSignupStep(0);
          }
          else if (error?.status === 429) {
            showToast({
              message: ERR_MSG_TOO_MANY_REQUEST,
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
    }
  };

  if (signupStep === 2) {
    return (
      <div>
        <div className={finishTitleStyle}>회원가입 완료</div>
        <div className={welcomeMessageStyle}>환영합니다!</div>
        <div className={linkListStyle}>
          <Link href="/">메인 화면으로</Link>
          <Link href="/signin">로그인</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => { handleRequestVerificationCode(data); })}
        className={formStyle}
      >
        <label htmlFor="phoneNumber">
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
        {formState?.errors?.phoneNumber && <div className={formErrorStyle}>{formState.errors.phoneNumber?.message}</div>}
        <label htmlFor="password">
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
        {formState?.errors?.password && <div className={formErrorStyle}>{formState.errors.password?.message}</div>}
        <label htmlFor="confirmPassword">
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
        {formState?.errors?.confirmPassword && <div className={formErrorStyle}>{formState.errors.confirmPassword?.message}</div>}
        {signupStep === 0 && (
          <div className={formSubmitStyle}>
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
          className={formStyle}
        >
          <label htmlFor="verificationCode">
            인증번호
          </label>
          <div className={verificationSectionStyle}>
            <CustomInput
              id="verificationCode"
              type="text"
              inputMode="numeric"
              error={verificationFormState.errors.verificationCode !== undefined}
              {...verificationRegister('verificationCode', {
                required: {
                  value: true,
                  message: ERR_MSG_EMPTY_VERIFICATIONCODE,
                },
              })}
            />
            <div className={timerStyle}>
              {(count / 60) >> 0}
              :
              {(count % 60).toString().padStart(2, '0')}
            </div>
            <CustomButton
              type="button"
              content="인증번호 재전송"
              clickAction={handleRefreshVerificationCode}
            />
          </div>
          {verificationFormState.errors.verificationCode && (
            <div className={formErrorStyle}>
              {verificationFormState.errors.verificationCode.message}
            </div>
          )}
          <div className={formSubmitStyle}>
            <CustomButton
              type="submit"
              content="완료"
            />
          </div>
        </form>
      )}
    </div>
  );
}
