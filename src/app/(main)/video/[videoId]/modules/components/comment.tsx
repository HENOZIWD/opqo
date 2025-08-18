import ChannelImage from '@/components/channel/channelImage';
import { commentStyle } from '../styles/commentStyle.css';
import { Comment as CommentType } from '../utils/type';
import Date from '@/components/common/date';
import Link from 'next/link';

type CommentProps = CommentType;

export default function Comment({
  comment,
  createdDate,
  user,
}: CommentProps) {
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
        <div>{comment}</div>
        <div className={commentStyle.createdDate}>
          <Date
            dateStr={createdDate}
            type="time"
          />
        </div>
      </div>
    </div>
  );
}
