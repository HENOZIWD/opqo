'use client';

import useSWRImmutable from 'swr/immutable';
import styles from './style.module.css';
import { VideoCardResponse } from '@/apis/getResponseType';
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

interface VideoListFetcherProps { category: string }

export default function VideoListFetcher({ category }: VideoListFetcherProps) {
  const {
    data,
    isLoading,
    error,
  } = useSWRImmutable<VideoCardResponse[]>(`/contents?view=${category}`, getFetcher, { shouldRetryOnError: false });

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
        title,
        duration,
        createdDate,
        channelId,
        channelName,
      }) => (
        <li
          key={id}
          className={styles.videoCard}
        >
          <VideoCard
            videoId={id}
            videoTitle={title}
            videoDuration={duration}
            createdDate={createdDate}
            channelInfo={{
              channelId,
              channelName,
            }}
          />
        </li>
      ))}
    </ul>
  );
}
