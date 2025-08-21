'use client';

import ChannelImage from '@/components/channel/channelImage';
import { commentStyle } from '../styles/commentStyle.css';
import { Comment as CommentType } from '../utils/type';
import Date from '@/components/common/date';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import { useCommentState } from '../hooks/useCommentState';
import { deleteComment } from '../apis/deleteComment';
import { useToast } from '@/hooks/useToast';
import { Cross1Icon } from '@radix-ui/react-icons';

type CommentProps = CommentType;

export default function Comment({
  id,
  comment,
  createdDate,
  isOwn,
  user,
}: CommentProps) {
  const { fetchHandler } = useFetch();
  const {
    commentList,
    setCommentList,
    commentCount,
    setCommentCount,
  } = useCommentState();
  const { showToast } = useToast();

  const handleDeleteComment = () => {
    fetchHandler(({
      accessToken,
      controller,
    }) => deleteComment({
      id,
      accessToken,
      controller,
    }), {
      onSuccess: () => {},
      onError: () => {},
      onFinal: () => {
        showToast({ message: '댓글을 삭제했습니다.' });
        setCommentList(commentList?.filter((e) => e.id !== id) ?? null);
        setCommentCount(commentCount - 1);
      },
    });
  };

  return (
    <div className={commentStyle.container}>
      <div className={commentStyle.channelImage}>
        <ChannelImage
          channelName={user.name}
          url={user.picture}
        />
      </div>
      <div className={commentStyle.commentWrapper}>
        <Link
          href={`/channel/${user.id}`}
          className={commentStyle.channelName}
        >
          {user.name}
        </Link>
        <div className={commentStyle.comment}>{comment}</div>
        <div className={commentStyle.createdDate}>
          <Date
            dateStr={createdDate}
            type="time"
          />
        </div>
      </div>
      {isOwn
        ? (
          <button
            type="button"
            className={commentStyle.deleteButton}
            title="댓글 삭제"
            aria-label="댓글 삭제"
            onClick={handleDeleteComment}
          >
            <Cross1Icon />
          </button>
        )
        : null}
    </div>
  );
}
