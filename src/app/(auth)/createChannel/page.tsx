'use client';

import { useForm } from 'react-hook-form';
import styles from './page.module.css';
import { CreateChannelContent } from '@/utils/type';
import CustomInput from '@/components/customInput/component';
import { ERR_MSG_AUTHORIZATION_FAILED, ERR_MSG_CHANNEL_LIMIT_EXCEEDED, ERR_MSG_CHANNELNAME_RULE, ERR_MSG_DUPLICATED_CHANNELNAME, ERR_MSG_INTERNAL_SERVER } from '@/utils/message';
import CustomButton from '@/components/customButton/component';
import { REGEXP_CHANNELNAME } from '@/utils/regexp';
import ChannelImageSelector from '@/components/channelImageSelector/component';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createChannel } from '@/apis/channel';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import PrivateRoute from '@/boundary/PrivateRoute';

export default function CreateChannelPage() {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<CreateChannelContent>();

  const [channelImageData, setChannelImageData] = useState<Blob | null>(null);

  const router = useRouter();

  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  const handleCreateChannel = (data: CreateChannelContent) => {
    fetchHandler((controller) => createChannel({
      imageFile: channelImageData,
      json: {
        name: data.channelName,
        description: data.description,
      },
      controller,
    }), {
      onSuccess: () => { router.push('/selectChannel'); },
      onError: (error) => {
        if (error?.status === 401) {
          showToast({
            message: ERR_MSG_AUTHORIZATION_FAILED,
            type: 'error',
          });
        }
        else if (error?.status === 409) {
          showToast({
            message: ERR_MSG_DUPLICATED_CHANNELNAME,
            type: 'error',
          });
        }
        else if (error?.status == 422) {
          showToast({
            message: ERR_MSG_CHANNEL_LIMIT_EXCEEDED,
            type: 'error',
          });
        }
        else {
          showToast({
            message: ERR_MSG_INTERNAL_SERVER,
            type: 'error',
          });
        }
      },
    });
  };

  return (
    <PrivateRoute level="user">
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
      </main>
    </PrivateRoute>
  );
}
