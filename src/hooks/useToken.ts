import { RefreshTokenContext, TokenContext } from '@/contexts/token';
import { useContext } from 'react';

export function useToken() {
  const accessToken = useContext(TokenContext);
  const refreshAccessToken = useContext(RefreshTokenContext);

  if (!refreshAccessToken) {
    throw Error('RefreshTokenContext is null');
  }

  return {
    accessToken,
    refreshAccessToken,
  };
}
