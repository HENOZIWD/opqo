'use client';

import CustomButton from '../customButton/component';
import CustomLink from '../customLink/component';
import styles from './style.module.css';
import { useState } from 'react';
import ChannelImage from '../channelImage/component';
import Link from 'next/link';
import { signout } from '@/apis/user';
import { useFetch } from '@/hooks/useFetch';
import { AccessToken } from '@/utils/type';
import { deleteAccessTokenCookie } from '@/serverActions/token';

interface AuthTopBarProps { auth: AccessToken | null }

export default function AuthTopBar({ auth }: AuthTopBarProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { fetchHandler } = useFetch();

  const handleSignout = () => {
    fetchHandler((controller) => signout({ controller }), {
      onSuccess: () => { },
      onError: () => { },
      onFinal: async () => {
        await deleteAccessTokenCookie();
        location.reload();
      },
    });
  };

  if (!auth || !auth.id || !auth.name) {
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
            channelId={auth.id}
            channelName={auth.name}
          />
        </button>
      </div>
      {isExpanded
        ? (
          <div className={styles.menuContainer}>
            <div className={styles.channelInfo}>
              <div className={styles.channelName}>{auth.name}</div>
              <div className={styles.changeChannel}>
                <Link href="/selectChannel">채널 변경</Link>
              </div>
            </div>
            <ul className={styles.menuList}>
              <li>
                <Link
                  href={`/channel/${auth.id}`}
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
