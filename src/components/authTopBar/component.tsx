'use client';

import CustomButton from '../customButton/component';
import CustomLink from '../customLink/component';
import styles from './style.module.css';
import { useEffect, useState } from 'react';
import ChannelImage from '../channelImage/component';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useFetch } from '@/hooks/useFetch';
import { signout } from '@/apis/user';
import { usePathname, useRouter } from 'next/navigation';
import { AUTHENTICATION_REQUIRED_ROUTES } from '@/utils/constant';

export default function AuthTopBar() {
  const {
    auth,
    authDispatch,
  } = useAuth();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const pathname = usePathname();
  const router = useRouter();

  const { fetchHandler } = useFetch();

  useEffect(() => {
    authDispatch({ type: 'signin' });
  }, []);

  useEffect(() => {
    const currentPath = pathname.split('/')[1];

    if (AUTHENTICATION_REQUIRED_ROUTES.includes(currentPath) && !auth.isSignin) {
      router.replace('/selectChannel');
    }
  }, [pathname, auth.isSignin, router]);

  const handleSignout = () => {
    fetchHandler((controller) => signout({ controller }), {
      onSuccess: () => { },
      onError: () => { },
      onFinal: () => { authDispatch({ type: 'signout' }); },
    });
  };

  if (!auth) {
    return null;
  }

  if (!auth.isSignin || !auth.channelId || !auth.channelName) {
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
      <div className={styles.container}>
        <CustomLink
          href="/uploadVideo"
          size="small"
          prefetch={false}
        >
          동영상 업로드
        </CustomLink>
        <button
          type="button"
          className={styles.accountMenu}
          onClick={() => { setIsExpanded((prev) => !prev); }}
        >
          <ChannelImage
            channelId={auth.channelId}
            channelName={auth.channelName}
          />
        </button>
      </div>
      {isExpanded
        ? (
          <div className={styles.menuContainer}>
            <div className={styles.channelInfo}>
              <div className={styles.channelName}>{auth.channelName}</div>
              <div className={styles.changeChannel}>
                <Link href="/selectChannel">채널 변경</Link>
              </div>
            </div>
            <ul className={styles.menuList}>
              <li>
                <Link
                  href={`/channel/${auth.channelId}`}
                  className={styles.menu}
                >
                  내 채널
                </Link>
              </li>
            </ul>
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
