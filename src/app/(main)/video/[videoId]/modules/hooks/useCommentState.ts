import { useAtom } from 'jotai';
import { commentStateAtoms } from '../components/commentStateProvider';

export function useCommentState() {
  const [commentList, setCommentList] = useAtom(commentStateAtoms.commentListAtom);

  return {
    commentList,
    setCommentList,
  };
}
