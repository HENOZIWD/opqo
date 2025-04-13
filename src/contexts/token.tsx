'use client';

import { refreshToken } from '@/apis/user';
import { useAbortController } from '@/hooks/useAbortController';
import { setAccessTokenCookie } from '@/serverActions/token';
import { parseJwt } from '@/utils/token';
import { usePathname } from 'next/navigation';
import { createContext, ReactNode, useEffect, useState } from 'react';

export const TokenContext = createContext<string | null>(null);
export const RefreshTokenContext = createContext<(() => Promise<boolean>) | null>(null);

interface TokenProviderProps {
  children: ReactNode;
  token: string | null;
}

export default function TokenProvider({
  children,
  token,
}: TokenProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(token);

  const pathname = usePathname();
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
    if (!accessToken) {
      return;
    }

    const decodedToken = parseJwt(accessToken);

    if (!decodedToken) {
      return;
    }

    const remainExpTime = decodedToken.exp - (Date.now() / 1000);

    if (remainExpTime < 60 * 5) {
      refreshAccessToken();
    }
  }, [pathname]);

  return (
    <TokenContext.Provider value={accessToken}>
      <RefreshTokenContext.Provider value={refreshAccessToken}>
        {children}
      </RefreshTokenContext.Provider>
    </TokenContext.Provider>
  );
}
