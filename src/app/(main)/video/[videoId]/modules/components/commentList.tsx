import { commentListStyle } from '../styles/commentListStyle.css';
import { Comment as CommentType } from '../utils/type';
import Comment from './comment';

interface CommentListProps { data: CommentType[] | null }

export default function CommentList({ data }: CommentListProps) {
  if (!data) {
    return (
      <div className={commentListStyle.container}>
        댓글을 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <ul className={commentListStyle.container}>
      {data.length > 0
        ? data.map(({
          id,
          comment,
          createdDate,
          isOwn,
          user,
        }) => (
          <li key={id}>
            <Comment
              id={id}
              comment={comment}
              createdDate={createdDate}
              isOwn={isOwn}
              user={user}
            />
          </li>
        ))
        : <div>댓글이 없습니다.</div>}
    </ul>
  );
}
