import { useAtom } from 'jotai';
import { commentStateAtoms } from '../components/commentStateProvider';

export function useCommentState() {
  const [commentList, setCommentList] = useAtom(commentStateAtoms.commentListAtom);
  const [commentCount, setCommentCount] = useAtom(commentStateAtoms.commentCountAtom);

  return {
    commentList,
    setCommentList,
    commentCount,
    setCommentCount,
  };
}
