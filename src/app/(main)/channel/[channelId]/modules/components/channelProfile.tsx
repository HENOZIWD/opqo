import ChannelImage from '@/components/channel/channelImage';
import { formatDateString } from '@/utils/date';
import { channelProfileStyle } from '../styles/channelProfileStyle.css';

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
        <h1 className={channelProfileStyle.name}>
          {name}
        </h1>
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
