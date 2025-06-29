import ChannelImage from '@/components/channel/channelImage';
import { formatDateString } from '@/utils/date';
import { channelProfileStyle } from '../styles/channelProfileStyle.css';

interface ChannelProfileProps {
  email: string;
  name: string;
  description: string;
  createdDate: string;
  picture: string;
}

export default function ChannelProfile({
  email,
  name,
  description,
  createdDate,
  picture,
}: ChannelProfileProps) {
  return (
    <div className={channelProfileStyle.container}>
      <div className={channelProfileStyle.image}>
        <ChannelImage
          channelName={name}
          url={picture}
        />
      </div>
      <div className={channelProfileStyle.info}>
        <h1 className={channelProfileStyle.name}>
          {name}
        </h1>
        <div>
          {email}
        </div>
        <div className={channelProfileStyle.description}>
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
