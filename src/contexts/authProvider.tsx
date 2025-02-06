'use client';

import { CHANNEL_IMAGE_URL, CHANNEL_NAME, CHANNEL_TOKEN } from '@/utils/constant';
import { useReducer } from 'react';
import { AuthContext, AuthDispatchContext } from './auth';
import { Auth, AuthAction } from '@/utils/type';

function authReducer(auth: Auth, action: AuthAction): Auth {
  if (action.type === 'signin') {
    const channelToken = sessionStorage.getItem(CHANNEL_TOKEN);
    const channelImageUrl = sessionStorage.getItem(CHANNEL_IMAGE_URL);
    const channelName = sessionStorage.getItem(CHANNEL_NAME);

    if (!channelToken) {
      return {
        isSignin: false,
        channelToken: null,
        channelImageUrl: null,
        channelName: null,
      };
    }

    return {
      isSignin: true,
      channelToken,
      channelImageUrl,
      channelName,
    };
  }

  if (action.type === 'signout') {
    sessionStorage.removeItem(CHANNEL_TOKEN);
    sessionStorage.removeItem(CHANNEL_IMAGE_URL);
    sessionStorage.removeItem(CHANNEL_NAME);

    return {
      isSignin: false,
      channelToken: null,
      channelImageUrl: null,
      channelName: null,
    };
  }

  return auth;
}

const initialAuth: Auth = {
  isSignin: false,
  channelToken: null,
  channelImageUrl: null,
  channelName: null,
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, dispatch] = useReducer(authReducer, initialAuth);
  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}
