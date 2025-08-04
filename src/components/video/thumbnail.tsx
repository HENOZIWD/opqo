'use client';

import { colorStyleVars } from '@/styles/constants';
import { thumbnailStyle } from '@/styles/video/thumbnailStyle.css';
import { numberToTime } from '@/utils/convert';
import Image from 'next/image';
import { useState } from 'react';

interface ThumbnailProps {
  videoId: string;
  videoTitle: string;
  duration?: number;
  watchProgress?: number;
}

export default function Thumbnail({
  videoId,
  videoTitle,
  duration,
  watchProgress,
}: ThumbnailProps) {
  const [src, setSrc] = useState<string>(process.env.NEXT_PUBLIC_CDN_VIDEO_URL
    ? `${process.env.NEXT_PUBLIC_CDN_VIDEO_URL}/${videoId}/thumbnail.webp`
    : '/assets/lightgray.png');

  const handleError = () => {
    setSrc('/assets/lightgray.png');
  };

  return (
    <div className={thumbnailStyle.container}>
      <Image
        className={thumbnailStyle.image}
        src={src}
        alt={`${videoTitle} 썸네일`}
        fill
        sizes="640px"
        onError={handleError}
      />
      {duration !== undefined ? <div className={thumbnailStyle.duration}>{numberToTime(duration)}</div> : null}
      {watchProgress !== undefined && duration !== undefined
        ? (
          <div
            className={thumbnailStyle.watchProgress}
            style={{
              background: `linear-gradient(
                to right,
                ${colorStyleVars.red},
                ${colorStyleVars.red} ${(watchProgress / duration) * 100}%,
                ${colorStyleVars.lightGray} ${(watchProgress / duration) * 100}%,
                ${colorStyleVars.lightGray} ${100}%
              )`,
            }}
          />
        )
        : null}
    </div>
  );
}
