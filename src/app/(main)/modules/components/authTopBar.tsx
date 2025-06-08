'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import { AccessToken } from '@/utils/type';
import { deleteAccessTokenCookie } from '../serverActions/token';
import { signout } from '../apis/signout';
import { authTopBarStyle } from '../styles/authTopBarStyle.css';
import CustomLink from '@/components/common/customLink';
import ChannelImage from '@/components/channel/channelImage';
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

  if (!auth || !auth.id || !auth.name) {
    return (
      <div className={authTopBarStyle.container}>
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
            channelId={auth.id}
            channelName={auth.name}
          />
        </button>
      </div>
      {isExpanded
        ? (
          <div className={authTopBarStyle.menuContainer}>
            <div className={authTopBarStyle.channelInfo}>
              <div className={authTopBarStyle.channelName}>{auth.name}</div>
              <div className={authTopBarStyle.changeChannel}>
                <Link href="/selectChannel">채널 변경</Link>
              </div>
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
