'use client';

import { channelImageStyle } from '@/components/channel/channelImage/style.css';
import Image from 'next/image';

interface ChannelImageProps {
  channelName: string;
  url: string;
}

export default function ChannelImage({
  channelName,
  url,
}: ChannelImageProps) {
  return (
    <div className={channelImageStyle.container}>
      <Image
        className={channelImageStyle.image}
        src={url}
        alt={`${channelName} 채널 이미지`}
        fill
        sizes="128px"
      />
    </div>
  );
}
