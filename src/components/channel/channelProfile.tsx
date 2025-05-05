import { channelProfileStyle } from '@/styles/channel.css';
import ChannelImage from './channelImage';
import { formatDateString } from '@/utils/date';

interface ChannelProfileProps {
  id: string;
  name: string;
  description: string;
  createdDate: string;
}

export default function ChannelProfile({
  id,
  name,
  description,
  createdDate,
}: ChannelProfileProps) {
  return (
    <div className={channelProfileStyle.container}>
      <div className={channelProfileStyle.image}>
        <ChannelImage
          channelId={id}
          channelName={name}
        />
      </div>
      <div className={channelProfileStyle.info}>
        <div className={channelProfileStyle.name}>
          {name}
        </div>
        <div>
          {description}
        </div>
        <div>
          가입일
          {' '}
          {formatDateString(createdDate)}
        </div>
      </div>
    </div>
  );
}
