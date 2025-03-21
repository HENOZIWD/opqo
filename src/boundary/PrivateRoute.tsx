'use client';

import PageLoadingIcon from '@/icons/pageLoadingIcon';
import { getAccessToken } from '@/utils/storage';
import { getInfoFromAccessToken } from '@/utils/token';
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

  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      router.replace('/signin');

      return;
    }

    const decodedToken = getInfoFromAccessToken(accessToken);

    if (!decodedToken) {
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
