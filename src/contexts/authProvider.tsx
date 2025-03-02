'use client';

import { useReducer } from 'react';
import { AuthContext, AuthDispatchContext } from './auth';
import { Auth, AuthAction } from '@/utils/type';
import { getAuthSession, removeAuthSession } from '@/utils/storage';

function authReducer(auth: Auth, action: AuthAction): Auth {
  if (action.type === 'signin') {
    const {
      channelToken,
      channelId,
      channelName,
    } = getAuthSession();

    if (!channelToken || !channelId || !channelName) {
      removeAuthSession();

      return {
        isSignin: false,
        channelId: null,
        channelName: null,
      };
    }

    return {
      isSignin: true,
      channelId,
      channelName,
    };
  }

  if (action.type === 'signout') {
    removeAuthSession();

    return {
      isSignin: false,
      channelId: null,
      channelName: null,
    };
  }

  return auth;
}

const initialAuth: Auth = {
  isSignin: false,
  channelId: null,
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
