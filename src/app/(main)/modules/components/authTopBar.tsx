'use client';

import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import { AccessToken } from '@/utils/type';
import { signout } from '../apis/signout';
import { authTopBarStyle } from '../styles/authTopBarStyle.css';
import ChannelImage from '@/components/channel/channelImage';
import { buttonStyle } from '@/styles/common/buttonStyle.css';
import * as Popover from '@radix-ui/react-popover';

interface AuthTopBarProps { auth: AccessToken | null }

export default function AuthTopBar({ auth }: AuthTopBarProps) {
  const {
    fetchHandler,
    isFetching,
  } = useFetch();

  const handleSignout = () => {
    fetchHandler(({ controller }) => signout({ controller }), {
      onSuccess: () => { window.location.reload(); },
      onError: () => { },
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
    <div className={authTopBarStyle.container}>
      <Link
        className={buttonStyle.small}
        href="/uploadVideo"
        prefetch={false}
      >
        동영상 업로드
      </Link>
      <Popover.Root>
        <Popover.Trigger className={authTopBarStyle.accountMenu}>
          <ChannelImage
            channelName={auth.name}
            url={auth.picture}
          />
        </Popover.Trigger>

        <Popover.Content
          sideOffset={16}
          align="end"
        >
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
                disabled={isFetching}
              >
                로그아웃
              </button>
            </div>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}
