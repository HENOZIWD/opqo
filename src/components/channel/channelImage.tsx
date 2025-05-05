'use client';

import { channelImageStyle } from '@/styles/channel.css';
import Image from 'next/image';
import { useState } from 'react';

interface ChannelImageProps {
  channelId: string;
  channelName: string;
}

export default function ChannelImage({
  channelId,
  channelName,
}: ChannelImageProps) {
  const [src, setSrc] = useState<string>(process.env.NEXT_PUBLIC_CDN_CHANNELIMAGE_URL
    ? `${process.env.NEXT_PUBLIC_CDN_CHANNELIMAGE_URL}/${channelId}`
    : '/assets/lightgray.png');

  const handleError = () => {
    setSrc('/assets/lightgray.png');
  };

  return (
    <div className={channelImageStyle.container}>
      <Image
        className={channelImageStyle.image}
        src={src}
        alt={`${channelName} 채널 이미지`}
        fill
        sizes="128px"
        onError={handleError}
      />
    </div>
  );
}
