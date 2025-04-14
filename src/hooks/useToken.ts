import { TokenContext } from '@/contexts/token';
import { useContext } from 'react';

export function useToken() {
  const accessToken = useContext(TokenContext);

  return { accessToken };
}
