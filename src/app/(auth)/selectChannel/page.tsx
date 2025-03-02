'use client';

import ChannelSelectButton from '@/components/channelSelectButton/component';
import styles from './page.module.css';
import { channelGETFetcher } from '@/apis/channel';
import CustomLink from '@/components/customLink/component';
import { useState } from 'react';
import WarningIcon from '@/icons/warningIcon';
import useSWRImmutable from 'swr/immutable';

export default function SelectChannelPage() {
  const {
    data,
    error,
  } = useSWRImmutable('/users/me/channels', channelGETFetcher, { shouldRetryOnError: false });

  const [errorMessage, setErrorMessage] = useState('');

  if (error) {
    return (
      <main>
        <h1 className={styles.title}>채널 선택</h1>
        <div className={styles.channelLoadError}>
          <div className={styles.warningIcon}>
            <WarningIcon />
          </div>
          <div className={styles.error}>채널 목록을 불러오지 못했습니다.</div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1 className={styles.title}>채널 선택</h1>
      <ul className={styles.channelList}>
        {data
          ? (data.length > 0
            ? data.map(({
              id,
              name,
            }) => (
              <li key={id}>
                <ChannelSelectButton
                  channelId={id}
                  channelImageUrl={`${process.env.NEXT_PUBLIC_CDN_CHANNELIMAGE_URL}/${id}`}
                  channelName={name}
                  setErrorMessage={setErrorMessage}
                />
              </li>
            ))
            : <div className={styles.noChannel}>채널이 없습니다. 채널을 생성해주세요.</div>)
          : null}
      </ul>
      <CustomLink href="/createChannel">
        새로운 채널 생성
      </CustomLink>
      <div className={styles.errorMessage}>{errorMessage}</div>
    </main>
  );
}
