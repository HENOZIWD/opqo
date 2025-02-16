import styles from './style.module.css';
import ChannelImage from '../channelImage/component';

interface ChannelProfileProps {
  channelImageUrl: string;
  channelName: string;
  description: string;
  created: string;
}

export default function ChannelProfile({
  channelImageUrl,
  channelName,
  description,
  created,
}: ChannelProfileProps) {
  return (
    <div className={styles.container}>
      <div className={styles.channelImage}>
        <ChannelImage
          src={channelImageUrl}
          channelName={channelName}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.channelName}>
          {channelName}
        </div>
        <div className={styles.description}>
          {description}
        </div>
        <div className={styles.created}>
          가입일
          {' '}
          {created}
        </div>
      </div>
    </div>
  );
}
