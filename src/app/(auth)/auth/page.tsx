'use client';

import { refreshToken } from '@/apis/user';
import { useAbortController } from '@/hooks/useAbortController';
import { setAccessTokenCookie } from '@/serverActions/token';
import { parseJwt } from '@/utils/token';
import { useEffect } from 'react';

export default function AuthPage() {
  const { createAbortController } = useAbortController();

  useEffect(() => {
    (async () => {
      try {
        const controller = createAbortController();
        const response = await refreshToken({ controller });

        const refreshedAccessToken = (await response.json()).accessToken;

        if (!refreshedAccessToken) {
          throw new Error('Invalid Token');
        }

        const decodedToken = parseJwt(refreshedAccessToken);

        if (!decodedToken) {
          throw new Error('Invalid Token');
        }

        await setAccessTokenCookie({
          accessToken: refreshedAccessToken,
          expUnixTimeStamp: decodedToken.exp,
        });
      }
      catch {
        alert('로그인에 실패했습니다.');
      }
      finally {
        window.location.replace('/');
      }
    })();
  }, []);

  return (
    <div>Login...</div>
  );
}
