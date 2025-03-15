'use client';

import { useAuth } from '@/hooks/useAuth';
import PageLoadingIcon from '@/icons/pageLoadingIcon';
import { getAuthSession } from '@/utils/storage';
import { isValidToken } from '@/utils/token';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface ChannelRequiredRouteProps { children: ReactNode }

export default function ChannelRequiredRoute({ children }: ChannelRequiredRouteProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const { authDispatch } = useAuth();

  useEffect(() => {
    const { channelToken } = getAuthSession();

    if (!isValidToken(channelToken)) {
      authDispatch({ type: 'signout' });
      router.replace('/selectChannel');

      return;
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      >
        <PageLoadingIcon />
      </div>
    );
  }

  return children;
}
