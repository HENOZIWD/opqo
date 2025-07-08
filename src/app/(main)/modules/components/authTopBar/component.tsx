'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import { AccessToken } from '@/utils/type';
import { deleteAccessTokenCookie } from '../../serverActions/token';
import { signout } from '../../apis/signout';
import { authTopBarStyle } from './style.css';
import CustomLink from '@/components/common/customLink';
import ChannelImage from '@/components/channel/channelImage/component';
import CustomButton from '@/components/common/customButton';

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
        <CustomLink
          href={process.env.NEXT_PUBLIC_LOGIN_URL ?? '/'}
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
      <div className={authTopBarStyle.container}>
        <CustomLink
          href="/uploadVideo"
          size="small"
          prefetch={false}
        >
          동영상 업로드
        </CustomLink>
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
            </ul>
            <div className={authTopBarStyle.signout}>
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
