'use client';

import { refreshToken } from '@/apis/user';
import { useAbortController } from '@/hooks/useAbortController';
import { setAccessTokenCookie } from '@/serverActions/token';
import { ACCESS_TOKEN_REFRESH_OFFSET } from '@/utils/constant';
import { parseJwt } from '@/utils/token';
import { createContext, ReactNode, useEffect, useState } from 'react';

export const TokenContext = createContext<string | null>(null);

interface TokenProviderProps {
  children: ReactNode;
  token: string | null;
}

export default function TokenProvider({
  children,
  token,
}: TokenProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(token);

  const { createAbortController } = useAbortController();

  const refreshAccessToken = async () => {
    try {
      const controller = createAbortController();
      const response = await refreshToken({ controller });

      const refreshedAccessToken = response?.data.accessToken;

      if (!refreshedAccessToken) {
        return false;
      }

      const decodedToken = parseJwt(refreshedAccessToken);

      if (!decodedToken) {
        return false;
      }

      await setAccessTokenCookie({
        accessToken: refreshedAccessToken,
        expUnixTimeStamp: decodedToken.exp,
      });

      setAccessToken(refreshedAccessToken);

      return true;
    }
    catch (error) {
      console.error(error);

      return false;
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    (async () => {
      if (!accessToken) {
        await refreshAccessToken();

        return;
      }

      const decodedToken = parseJwt(accessToken);

      if (!decodedToken) {
        return;
      }

      const remainTimeMilliseconds = (decodedToken.exp * 1000) - Date.now();

      if (remainTimeMilliseconds > ACCESS_TOKEN_REFRESH_OFFSET) {
        timer = setTimeout(async () => {
          await refreshAccessToken();
        }, remainTimeMilliseconds - ACCESS_TOKEN_REFRESH_OFFSET);
      }
      else {
        await refreshAccessToken();
      }
    })();

    return () => clearTimeout(timer);
  }, [accessToken]);

  return (
    <TokenContext.Provider value={accessToken}>
      {children}
    </TokenContext.Provider>
  );
}
