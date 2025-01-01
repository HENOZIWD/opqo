import ChannelIcon from '../channelIcon/component';
import styles from './style.module.css';

interface ChannelProfileProps {
  icon: string;
  name: string;
  subscriberCount: string;
  description: string;
  created: string;
}

export default function ChannelProfile({
  icon,
  name,
  subscriberCount,
  description,
  created,
}: ChannelProfileProps) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <ChannelIcon
          src={icon}
          alt={`${name} icon`}
        />
      </div>
      <div>
        <div className={styles.name}>
          {name}
        </div>
        <div className={styles.subscriberCount}>
          {subscriberCount}
        </div>
        <div className={styles.description}>
          {description}
        </div>
        <div className={styles.created}>
          {created}
        </div>
      </div>
    </div>
  );
}
