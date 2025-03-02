import Image from 'next/image';
import styles from './style.module.css';
import { SyntheticEvent } from 'react';

interface ChannelImageProps {
  channelId: string;
  channelName: string;
}

export default function ChannelImage({
  channelId,
  channelName,
}: ChannelImageProps) {
  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/lightgray.png';
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={`${process.env.NEXT_PUBLIC_CDN_CHANNELIMAGE_URL}/${channelId}`}
        alt={`${channelName} 채널 이미지`}
        fill
        onError={handleImageError}
      />
    </div>
  );
}
