import styles from './style.module.css';
import ChannelImage from '../channelImage/component';

interface ChannelProfileProps {
  channelId: string;
  channelName: string;
  description: string;
  createdDate: Date;
}

export default function ChannelProfile({
  channelId,
  channelName,
  description,
  createdDate,
}: ChannelProfileProps) {
  return (
    <div className={styles.container}>
      <div className={styles.channelImage}>
        <ChannelImage
          channelId={channelId}
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
          {createdDate.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
