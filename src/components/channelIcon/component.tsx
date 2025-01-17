import Image from 'next/image';
import styles from './style.module.css';

interface ChannelIconProps {
  src: string;
  alt: string;
}

export default function ChannelIcon({
  src,
  alt,
}: ChannelIconProps) {
  return (
    <div className={styles.container}>
      <Image
        src={src}
        alt={alt}
        fill
      />
    </div>
  );
}
