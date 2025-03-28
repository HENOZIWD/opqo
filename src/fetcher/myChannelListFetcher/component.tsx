'use client';

import useSWRImmutable from 'swr/immutable';
import styles from './style.module.css';
import { MyChannelResponse } from '@/apis/getResponseType';
import { getFetcherWithCredentials } from '@/apis/getFetcher';
import ChannelSelectButton from '@/components/channelSelectButton/component';

export default function MyChannelListFetcher() {
  const {
    data,
    isLoading,
    error,
  } = useSWRImmutable<MyChannelResponse[]>('/users/me/channels', getFetcherWithCredentials, { shouldRetryOnError: false });

  if (isLoading) {
    return null;
  }

  if (error || !data) {
    return (
      <div className={styles.error}>채널 목록을 불러오지 못했습니다.</div>
    );
  }

  return (
    <ul className={styles.channelList}>
      {data.length > 0
        ? data.map(({
          id,
          name,
        }) => (
          <li key={id}>
            <ChannelSelectButton
              channelId={id}
              channelName={name}
            />
          </li>
        ))
        : (
          <div className={styles.noChannel}>
            채널이 없습니다. 채널을 생성해주세요.
          </div>
        )}
    </ul>
  );
}
