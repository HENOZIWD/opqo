import Image from 'next/image';
import styles from './style.module.css';

interface ChannelImageProps {
  src: string;
  channelName: string;
}

export default function ChannelImage({
  src,
  channelName,
}: ChannelImageProps) {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={src || '/assets/lightgray.png'}
        alt={`${channelName} 채널 이미지`}
        fill
      />
    </div>
  );
}
