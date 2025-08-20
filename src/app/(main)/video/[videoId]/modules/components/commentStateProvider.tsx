import { atom, Provider } from 'jotai';
import { ReactNode } from 'react';
import { Comment } from '../utils/type';

const commentListAtom = atom<Comment[] | null>([]);

export const commentStateAtoms = { commentListAtom };

interface CommentStateProviderProps { children: ReactNode }

export default function CommentStateProvider({ children }: CommentStateProviderProps) {
  return (
    <Provider>
      {children}
    </Provider>
  );
}
