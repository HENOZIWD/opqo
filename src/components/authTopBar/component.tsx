'use client';

import { AuthContext, AuthDispatchContext } from '@/contexts/auth';
import CustomButton from '../customButton/component';
import CustomLink from '../customLink/component';
import styles from './style.module.css';
import { useContext, useEffect } from 'react';

export default function AuthTopBar() {
  const auth = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);

  useEffect(() => {
    dispatch?.({ type: 'signin' });
  }, [dispatch]);

  const handleSignout = () => {
    dispatch?.({ type: 'signout' });
  };

  if (!auth?.isSignin) {
    return (
      <div className={styles.container}>
        <CustomLink
          href="/signin"
          size="small"
          prefetch={false}
        >
          로그인
        </CustomLink>
        <CustomLink
          href="/signup"
          size="small"
          prefetch={false}
        >
          회원가입
        </CustomLink>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <CustomButton
        type="button"
        size="small"
        content="로그아웃"
        clickAction={handleSignout}
      />
    </div>
  );
}
