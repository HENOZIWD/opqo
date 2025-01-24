'use client';

import { CHANNEL_TOKEN } from '@/utils/constant';
import { useReducer } from 'react';
import { AuthContext, AuthDispatchContext } from './auth';
import { Auth, AuthAction } from '@/utils/type';

function authReducer(auth: Auth, action: AuthAction): Auth {
  if (action.type === 'signin') {
    const token = sessionStorage.getItem(CHANNEL_TOKEN);

    if (!token) {
      return {
        isSignin: false,
        channelToken: null,
      };
    }

    return {
      isSignin: true,
      channelToken: token,
    };
  }

  if (action.type === 'signout') {
    sessionStorage.removeItem(CHANNEL_TOKEN);

    return {
      isSignin: false,
      channelToken: null,
    };
  }

  return auth;
}

const initialAuth: Auth = {
  isSignin: false,
  channelToken: null,
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
