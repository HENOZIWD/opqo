import { atom, Provider } from 'jotai';
import { ReactNode } from 'react';
import { Comment } from '../utils/type';

const commentListAtom = atom<Comment[] | null>([]);
const commentCountAtom = atom<number>(0);

export const commentStateAtoms = {
  commentListAtom,
  commentCountAtom,
};

interface CommentStateProviderProps { children: ReactNode }

export default function CommentStateProvider({ children }: CommentStateProviderProps) {
  return (
    <Provider>
      {children}
    </Provider>
  );
}
