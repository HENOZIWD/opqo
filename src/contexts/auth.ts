'use client';

import { Auth, AuthAction } from '@/utils/type';
import { ActionDispatch, createContext } from 'react';

export const AuthContext = createContext<Auth | null>(null);
export const AuthDispatchContext = createContext<ActionDispatch<[action: AuthAction]> | null>(null);
