'use client';

import ChannelImage from '@/components/channelImage/component';
import styles from './style.module.css';
import useSWRImmutable from 'swr/immutable';
import { ChannelResponse } from '@/apis/getResponseType';
import { getFetcher } from '@/apis/getFetcher';

function Skeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.imageSkeleton} />
      <div className={styles.content}>
        <div className={styles.textSkeleton} />
        <div className={styles.textSkeleton} />
        <div className={styles.textSkeleton} />
      </div>
    </div>
  );
}

interface ChannelProfileFetcherProps { channelId: string }

export default function ChannelProfileFetcher({ channelId }: ChannelProfileFetcherProps) {
  const {
    data,
    isLoading,
  } = useSWRImmutable<ChannelResponse>(`/channels/${channelId}`, getFetcher, { shouldRetryOnError: false });

  if (isLoading) {
    return <Skeleton />;
  }

  if (!data) {
    return <div className={styles.error}>채널 정보를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.channelImage}>
        <ChannelImage
          channelId={data.id}
          channelName={data.name}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.channelName}>
          {data.name}
        </div>
        <div className={styles.description}>
          {data.description}
        </div>
        <div className={styles.created}>
          가입일
          {' '}
          {data.createdDate}
        </div>
      </div>
    </div>
  );
}
