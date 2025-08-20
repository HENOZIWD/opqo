'use client';

import { commentListStyle } from '../styles/commentListStyle.css';
import { Comment as CommentType } from '../utils/type';
import Comment from './comment';
import { useCommentState } from '../hooks/useCommentState';
import { useEffect, useState } from 'react';

interface CommentListProps { data: CommentType[] | null }

export default function CommentList({ data }: CommentListProps) {
  const {
    commentList,
    setCommentList,
  } = useCommentState();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setCommentList(data);
    setIsLoading(false);
  }, [data, setCommentList]);

  if (isLoading) {
    return null;
  }

  if (!commentList) {
    return (
      <div className={commentListStyle.container}>
        댓글을 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <ul className={commentListStyle.container}>
      {commentList.length > 0
        ? commentList.map(({
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
