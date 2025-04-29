'use client';

import Image from 'next/image';
import styles from './style.module.css';
import { useState } from 'react';

interface ThumbnailProps {
  videoId: string;
  videoTitle: string;
}

export default function Thumbnail({
  videoId,
  videoTitle,
}: ThumbnailProps) {
  const [src, setSrc] = useState<string>(process.env.NEXT_PUBLIC_CDN_THUMBNAIL_URL
    ? `${process.env.NEXT_PUBLIC_CDN_THUMBNAIL_URL}/${videoId}`
    : '/assets/lightgray.png');

  const handleError = () => {
    setSrc('/assets/lightgray.png');
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.thumbnail}
        src={src}
        alt={`${videoTitle} 썸네일`}
        fill
        sizes="640px"
        onError={handleError}
      />
    </div>
  );
}
