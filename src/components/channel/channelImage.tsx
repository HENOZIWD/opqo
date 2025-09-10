'use client';

import { channelImageStyle } from '@/styles/channel/channelImageStyle.css';
import Image from 'next/image';
import Link from 'next/link';

interface ChannelImageProps {
  channelName: string;
  url: string;
  isStreaming?: boolean;
  channelId?: string;
}

export default function ChannelImage({
  channelName,
  url,
  isStreaming = false,
  channelId,
}: ChannelImageProps) {
  if (isStreaming) {
    return (
      <>
        <Link
          href={`/channel/${channelId}/live`}
          className={channelImageStyle.live}
          aria-label="라이브 보러가기"
          title="라이브 보러가기"
        >
          <Image
            className={channelImageStyle.image}
            src={url}
            alt={`${channelName} 채널 이미지`}
            fill
            sizes="128px"
          />
        </Link>
        <div className={channelImageStyle.liveTag}>라이브</div>
      </>
    );
  }

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
