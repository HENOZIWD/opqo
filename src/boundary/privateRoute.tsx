'use client';

import { validateAuth } from '@/apis/user';
import PageLoading from '@/components/pageLoading/component';
import { useAuth } from '@/hooks/useAuth';
import { useFetch } from '@/hooks/useFetch';
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
  const { fetchHandler } = useFetch();

  useEffect(() => {
    fetchHandler((controller) => validateAuth({ controller }), {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        if (level === 'user') {
          if (error?.status === 403) {
            return;
          }

          authDispatch({ type: 'signout' });
          router.replace('/signin');

          return;
        }

        if (level === 'channel') {
          authDispatch({ type: 'signout' });

          if (error?.status === 403) {
            router.replace('/selectChannel');

            return;
          }

          router.replace('/signin');
        }
      },
    });
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return children;
}
