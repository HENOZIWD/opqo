'use client';

import { useForm } from 'react-hook-form';
import { CreateChannelContent } from '@/utils/type';
import CustomInput from '@/components/common/customInput';
import { ERR_MSG_AUTHORIZATION_FAILED, ERR_MSG_CHANNEL_LIMIT_EXCEEDED, ERR_MSG_CHANNELNAME_RULE, ERR_MSG_DUPLICATED_CHANNELNAME, ERR_MSG_INTERNAL_SERVER } from '@/utils/message';
import CustomButton from '@/components/common/customButton';
import { REGEXP_CHANNELNAME } from '@/utils/regexp';
import ChannelImageSelector from '@/components/form/channelImageSelector';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createChannel } from '@/apis/channel';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import { formStyle } from '@/styles/form.css';

export default function CreateChannelForm() {
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
    fetchHandler(({
      controller,
      accessToken,
    }) => createChannel({
      imageFile: channelImageData,
      name: data.channelName,
      description: data.description,
      controller,
      accessToken,
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
    <div>
      <ChannelImageSelector setImageData={setChannelImageData} />
      <form
        onSubmit={handleSubmit((data) => { handleCreateChannel(data); })}
        className={formStyle.container}
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
          <div className={formStyle.error}>
            {formState.errors.channelName?.message}
          </div>
        )}
        <label htmlFor="description">채널 설명</label>
        <CustomInput
          id="description"
          type="text"
          {...register('description')}
        />
        <div className={formStyle.submit}>
          <CustomButton
            type="submit"
            content="완료"
          />
        </div>
      </form>
    </div>
  );
}
