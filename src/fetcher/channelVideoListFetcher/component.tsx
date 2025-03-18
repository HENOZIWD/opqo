'use client';

import { ChannelVideoCardResponse } from '@/apis/getResponseType';
import styles from './style.module.css';
import useSWRImmutable from 'swr/immutable';
import { getFetcher } from '@/apis/getFetcher';
import VideoCard from '@/components/videoCard/component';

function Skeleton() {
  return (
    <div className={styles.videoList}>
      <div className={styles.videoCard}>
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonThumbnail} />
          <div className={styles.skeletonText} />
          <div className={styles.skeletonText} />
        </div>
      </div>
      <div className={styles.videoCard}>
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonThumbnail} />
          <div className={styles.skeletonText} />
          <div className={styles.skeletonText} />
        </div>
      </div>
      <div className={styles.videoCard}>
        <div className={styles.skeletonContainer}>
          <div className={styles.skeletonThumbnail} />
          <div className={styles.skeletonText} />
          <div className={styles.skeletonText} />
        </div>
      </div>
    </div>
  );
}

interface ChannelVideoListFetcherProps { channelId: string }

export default function ChannelVideoListFetcher({ channelId }: ChannelVideoListFetcherProps) {
  const {
    data,
    isLoading,
    error,
  } = useSWRImmutable<ChannelVideoCardResponse[]>(`/channels/${channelId}/contents`, getFetcher, { shouldRetryOnError: false });

  if (isLoading) {
    return <Skeleton />;
  }

  if (error || !data) {
    return <div className={styles.error}>동영상 목록을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <ul className={styles.videoList}>
      {data.map(({
        id,
        duration,
        title,
        createdDate,
      }) => (
        <li
          className={styles.videoCard}
          key={id}
        >
          <VideoCard
            videoId={id}
            videoTitle={title}
            videoDuration={duration}
            createdDate={createdDate}
          />
        </li>
      ))}
    </ul>
  );
}
