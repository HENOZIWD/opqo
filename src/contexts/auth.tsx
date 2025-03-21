'use client';

import { getAccessToken, removeAccessToken } from '@/utils/storage';
import { getInfoFromAccessToken } from '@/utils/token';
import { ActionDispatch, createContext, useReducer } from 'react';

interface Auth {
  isSignin: boolean;
  role: 'user' | 'channel' | null;
  channelId: string | null;
  channelName: string | null;
}

interface AuthAction { type: 'signin' | 'signout' }

export const AuthContext = createContext<Auth | null>(null);
export const AuthDispatchContext = createContext<ActionDispatch<[action: AuthAction]> | null>(null);

function authReducer(auth: Auth, action: AuthAction): Auth {
  if (action.type === 'signin') {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return {
        isSignin: false,
        role: null,
        channelId: null,
        channelName: null,
      };
    }

    const accessTokenInfo = getInfoFromAccessToken(accessToken);

    if (!accessTokenInfo) {
      removeAccessToken();

      return {
        isSignin: false,
        role: null,
        channelId: null,
        channelName: null,
      };
    }

    if (accessTokenInfo.role === 'user') {
      return {
        isSignin: true,
        role: 'user',
        channelId: null,
        channelName: null,
      };
    }

    if (accessTokenInfo.role === 'channel' && accessTokenInfo.id !== null && accessTokenInfo.name !== null) {
      return {
        isSignin: true,
        role: 'channel',
        channelId: accessTokenInfo.id,
        channelName: accessTokenInfo.name,
      };
    }

    return {
      isSignin: false,
      role: null,
      channelId: null,
      channelName: null,
    };
  }

  if (action.type === 'signout') {
    removeAccessToken();

    return {
      isSignin: false,
      role: null,
      channelId: null,
      channelName: null,
    };
  }

  return auth;
}

const initialAuth: Auth = {
  isSignin: false,
  role: null,
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
