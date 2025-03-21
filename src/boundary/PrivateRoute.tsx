'use client';

import { useAuth } from '@/hooks/useAuth';
import PageLoadingIcon from '@/icons/pageLoadingIcon';
import { getAuthSession } from '@/utils/storage';
import { getChannelInfoFromJwt, isValidToken } from '@/utils/token';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface PrivateRouteProps {
  level: 'user' | 'channel';
  children: ReactNode;
}

export default function PrivateRoute({
  level,
  children,
}: PrivateRouteProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const { authDispatch } = useAuth();

  useEffect(() => {
    const { channelToken } = getAuthSession();

    if (!channelToken || !isValidToken(channelToken)) {
      authDispatch({ type: 'signout' });
      router.replace('/signin');

      return;
    }

    const decodedToken = getChannelInfoFromJwt(channelToken);

    if (!decodedToken) {
      authDispatch({ type: 'signout' });
      router.replace('/signin');

      return;
    }

    if (level === 'channel' && decodedToken.role === 'user') {
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
