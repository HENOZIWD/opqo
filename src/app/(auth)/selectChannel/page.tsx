'use client';

import ChannelSelectButton from '@/components/channelSelectButton/component';
import styles from './page.module.css';
import useSWR, { useSWRConfig } from 'swr';
import CustomButton from '@/components/customButton/component';
import { channelPOSTFetcher } from '@/apis/channel';
import CustomLink from '@/components/customLink/component';
import { useState } from 'react';

export default function SelectChannel() {
  const {
    data,
    error,
  } = useSWR('/myChannelList', channelPOSTFetcher, { shouldRetryOnError: false });

  const [errorMessage, setErrorMessage] = useState('');

  const { mutate } = useSWRConfig();

  const handleRetry = () => {
    mutate('/myChannelList');
  };

  if (error) {
    return (
      <main>
        <h1 className={styles.title}>채널 선택</h1>
        <div className={styles.container}>
          <div className={styles.error}>채널 목록을 불러오지 못했습니다.</div>
          <CustomButton
            type="button"
            content="재시도"
            clickAction={handleRetry}
          />
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1 className={styles.title}>채널 선택</h1>
      <ul className={styles.channelList}>
        {data && data.data.map(({
          id,
          name,
          image,
        }) => (
          <li key={id}>
            <ChannelSelectButton
              channelId={id}
              channelImageUrl={image}
              channelName={name}
              setErrorMessage={setErrorMessage}
            />
          </li>
        ))}
      </ul>
      <CustomLink href="/createChannel">
        새로운 채널 생성
      </CustomLink>
      <div className={styles.errorMessage}>{errorMessage}</div>
    </main>
  );
}
