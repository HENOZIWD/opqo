'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import { AccessToken } from '@/utils/type';
import { signout } from '../apis/signout';
import { authTopBarStyle } from '../styles/authTopBarStyle.css';
import ChannelImage from '@/components/channel/channelImage';
import { buttonStyle } from '@/styles/common/buttonStyle.css';
import { deleteAccessTokenCookie } from '@/serverActions/token';

interface AuthTopBarProps { auth: AccessToken | null }

export default function AuthTopBar({ auth }: AuthTopBarProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { fetchHandler } = useFetch();

  const handleSignout = () => {
    fetchHandler(({ controller }) => signout({ controller }), {
      onSuccess: () => { },
      onError: () => { },
      onFinal: async () => {
        await deleteAccessTokenCookie();
        window.location.reload();
      },
    });
  };

  if (!auth) {
    return (
      <div className={authTopBarStyle.container}>
        <Link
          className={buttonStyle.small}
          href={process.env.NEXT_PUBLIC_LOGIN_URL ?? '/'}
          prefetch={false}
        >
          로그인
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className={authTopBarStyle.container}>
        <Link
          className={buttonStyle.small}
          href="/uploadVideo"
          prefetch={false}
        >
          동영상 업로드
        </Link>
        <button
          type="button"
          className={authTopBarStyle.accountMenu}
          onClick={() => { setIsExpanded((prev) => !prev); }}
        >
          <ChannelImage
            channelName={auth.name}
            url={auth.picture}
          />
        </button>
      </div>
      {isExpanded
        ? (
          <div className={authTopBarStyle.menuContainer}>
            <div className={authTopBarStyle.channelInfo}>
              <div className={authTopBarStyle.channelName}>{auth.name}</div>
            </div>
            <ul className={authTopBarStyle.menuList}>
              <li>
                <Link
                  href={`/channel/${auth.id}`}
                  className={authTopBarStyle.menu}
                >
                  내 채널
                </Link>
              </li>
              <li>
                <Link
                  href="/studio/info"
                  className={authTopBarStyle.menu}
                >
                  내 스튜디오
                </Link>
              </li>
              <li>
                <Link
                  href="/history"
                  className={authTopBarStyle.menu}
                >
                  시청 기록
                </Link>
              </li>
            </ul>
            <div className={authTopBarStyle.signout}>
              <button
                className={buttonStyle.small}
                type="button"
                onClick={handleSignout}
              >
                로그아웃
              </button>
            </div>
          </div>
        )
        : null}
    </>
  );
}
