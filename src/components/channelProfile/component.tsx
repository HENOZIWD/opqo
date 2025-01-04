import ChannelIcon from '../channelIcon/component';
import styles from './style.module.css';
import CustomButton from '../customButtom/component';

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
  async function subscribe() {
    'use server';
    // Server action
  }

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <ChannelIcon
          src={icon}
          alt={`${name} icon`}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.name}>
          {name}
        </div>
        <div className={styles.subscriberCount}>
          구독자
          {' '}
          {subscriberCount}
          명
        </div>
        <div className={styles.description}>
          {description}
        </div>
        <div className={styles.created}>
          가입일
          {' '}
          {created}
        </div>
        <CustomButton
          type="button"
          clickAction={subscribe}
          content="구독"
        />
      </div>
    </div>
  );
}
