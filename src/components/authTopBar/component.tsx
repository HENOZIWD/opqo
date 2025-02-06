'use client';

import { AuthContext, AuthDispatchContext } from '@/contexts/auth';
import CustomButton from '../customButton/component';
import CustomLink from '../customLink/component';
import styles from './style.module.css';
import { useContext, useEffect, useState } from 'react';
import ChannelImage from '../channelImage/component';
import Link from 'next/link';

export default function AuthTopBar() {
  const auth = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    dispatch?.({ type: 'signin' });
  }, [dispatch]);

  const handleSignout = () => {
    dispatch?.({ type: 'signout' });
  };

  if (!auth) {
    return null;
  }

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
    <>
      <button
        type="button"
        className={styles.accountMenu}
        onClick={() => { setIsExpanded((prev) => !prev); }}
      >
        <ChannelImage
          src={auth.channelImageUrl}
          channelName={auth.channelName || ''}
        />
      </button>
      {isExpanded
        ? (
          <div className={styles.menu}>
            <div className={styles.channelInfo}>
              <div className={styles.channelName}>{auth.channelName}</div>
              <div className={styles.changeChannel}>
                <Link href="/selectChannel">채널 변경</Link>
              </div>
            </div>
            <div className={styles.signout}>
              <CustomButton
                type="button"
                clickAction={handleSignout}
                size="small"
                content="로그아웃"
              />
            </div>
          </div>
        )
        : null}
    </>
  );
}
