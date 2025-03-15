'use client';

import { useAuth } from '@/hooks/useAuth';
import { useFetch } from '@/hooks/useFetch';
import PageLoadingIcon from '@/icons/pageLoadingIcon';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface UserRequiredRouteProps { children: ReactNode }

export default function UserRequiredRoute({ children }: UserRequiredRouteProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const { authDispatch } = useAuth();
  const { fetchHandler } = useFetch();

  useEffect(() => {
    fetchHandler(() => axios.head<void>(`${process.env.NEXT_PUBLIC_SERVER_URL}/token`, { withCredentials: true }), {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        if (error?.status === 401) {
          authDispatch({ type: 'signout' });
          router.replace('/signin');

          return;
        }

        setIsLoading(false);
      },
    });
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
