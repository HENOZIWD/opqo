import { getAccessTokenCookie } from '@/serverActions/token';
import { ReactNode } from 'react';

interface AccessTokenWrapperProps { render: (accessToken: string | null) => ReactNode }

export default async function AccessTokenWrapper({ render }: AccessTokenWrapperProps) {
  const accessToken = await getAccessTokenCookie();

  return <>{render(accessToken ?? null)}</>;
}
