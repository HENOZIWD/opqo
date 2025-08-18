'use client';

import Textarea from '@/components/common/textarea';
import { commentUploaderStyle } from '../styles/commentUploaderStyle.css';
import { buttonStyle } from '@/styles/common/buttonStyle.css';
import { useFetch } from '@/hooks/useFetch';
import { uploadComment } from '../apis/uploadComment';
import { useToast } from '@/hooks/useToast';
import { FormEvent, useState } from 'react';

const COMMENT_LIMIT = 5000;

interface CommentUploadProps { videoId: string }

export default function CommentUploader({ videoId }: CommentUploadProps) {
  const [comment, setComment] = useState<string>('');
  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  const handleUploadComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedComment = comment.trim();

    if (!trimmedComment) {
      return;
    }

    fetchHandler(({
      controller,
      accessToken,
    }) => uploadComment({
      videoId,
      comment: trimmedComment,
      controller,
      accessToken,
    }), {
      onSuccess: () => {
        showToast({ message: '댓글 등록에 성공했습니다.' });
        setComment('');
      },
      onError: () => {
        showToast({
          message: '댓글 등록에 실패했습니다.',
          type: 'error',
        });
      },
    });
  };

  return (
    <form
      className={commentUploaderStyle.container}
      onSubmit={handleUploadComment}
    >
      <label htmlFor="comment">댓글 작성</label>
      <div className={commentUploaderStyle.textareaWrapper}>
        <div className={commentUploaderStyle.textarea}>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
            maxLength={COMMENT_LIMIT}
          />
        </div>
        <button
          type="submit"
          className={buttonStyle.default}
          disabled={!comment.trim()}
        >
          등록
        </button>
      </div>
    </form>
  );
}
