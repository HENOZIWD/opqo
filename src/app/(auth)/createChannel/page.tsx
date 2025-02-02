'use client';

import { useForm } from 'react-hook-form';
import styles from './page.module.css';
import { CreateChannelContent } from '@/utils/type';
import CustomInput from '@/components/customInput/component';
import { ERR_MSG_CHANNELNAME_RULE, ERR_MSG_DUPLICATED_CHANNELNAME, ERR_MSG_INTERNAL_SERVER } from '@/utils/message';
import CustomButton from '@/components/customButton/component';
import { REGEXP_CHANNELNAME } from '@/utils/regexp';
import ChannelImageSelector from '@/components/channelImageSelector/component';
import { useState } from 'react';
import { fetchHandler } from '@/utils/fetchHandler';
import { useRouter } from 'next/navigation';
import { createChannel } from '@/apis/channel';

export default function CreateChannelPage() {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<CreateChannelContent>();

  const [channelImageData, setChannelImageData] = useState<Blob | null>(null);

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateChannel = (data: CreateChannelContent) => {
    setErrorMessage('');
    fetchHandler(() => createChannel(data), {
      onSuccess: () => { router.push('/selectChannel'); },
      onError: (error) => {
        if (error?.status === 400) {
          setErrorMessage(ERR_MSG_DUPLICATED_CHANNELNAME);
        }
        else {
          setErrorMessage(ERR_MSG_INTERNAL_SERVER);
        }
      },
    });
  };

  return (
    <main>
      <h1 className={styles.title}>채널 생성</h1>
      <ChannelImageSelector setImageData={setChannelImageData} />
      <form
        onSubmit={handleSubmit((data) => { handleCreateChannel(data); })}
        className={styles.form}
      >
        <label htmlFor="channelName">채널명</label>
        <CustomInput
          id="channelName"
          type="text"
          {...register('channelName', {
            required: {
              value: true,
              message: ERR_MSG_CHANNELNAME_RULE,
            },
            pattern: {
              value: REGEXP_CHANNELNAME,
              message: ERR_MSG_CHANNELNAME_RULE,
            },
          })}
          error={formState?.errors?.channelName !== undefined}
        />
        {formState?.errors?.channelName && (
          <div className={styles.error}>
            {formState.errors.channelName?.message}
          </div>
        )}
        <label htmlFor="description">채널 설명</label>
        <CustomInput
          id="description"
          type="text"
          {...register('description')}
        />
        <div className={styles.submit}>
          <CustomButton
            type="submit"
            content="완료"
          />
        </div>
      </form>
      <div className={styles.errorMessage}>{errorMessage}</div>
    </main>
  );
}
