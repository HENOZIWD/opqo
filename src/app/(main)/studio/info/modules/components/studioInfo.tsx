'use client';

import { formatDateString } from '@/utils/date';
import ChannelImage from '@/components/channel/channelImage';
import { studioInfoStyle } from '../styles/studioInfoStyle.css';
import { useForm } from 'react-hook-form';
import { UpdateStudioInfo } from '../utils/type';
import { useState } from 'react';
import { ERR_MSG_CHANNEL_DESCRIPTION_LIMIT_EXCEEDED, ERR_MSG_CHANNEL_NAME_LIMIT_EXCEEDED, ERR_MSG_EMPTY_CHANNEL_NAME, UPDATE_STUDIO_INFO_FAILED, UPDATE_STUDIO_INFO_SUCCEEDED } from '../utils/message';
import StudioInfoSection from '../../../modules/components/studioInfoSection';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import { updateStudioInfo } from '../apis/updateStudioInfo';
import { formStyle } from '@/styles/form.css';
import { buttonStyle } from '@/styles/common/buttonStyle.css';
import Input from '@/components/common/input';
import Textarea from '@/components/common/textarea';

interface StudioInfoProps {
  email: string;
  name: string;
  description: string;
  createdDate: string;
  picture: string;
}

const CHANNEL_NAME_LIMIT = 50;
const CHANNEL_DESCRIPTION_LIMIT = 1000;

export default function StudioInfo({
  email,
  name,
  description,
  createdDate,
  picture,
}: StudioInfoProps) {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<UpdateStudioInfo>({
    mode: 'all',
    defaultValues: {
      name,
      description,
    },
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableData, setEditableData] = useState<UpdateStudioInfo>({
    name,
    description,
  });

  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  const handleUpdateStudioInfo = async (data: UpdateStudioInfo) => {
    if (!isEditing) {
      return;
    }

    fetchHandler(({
      controller,
      accessToken,
    }) => updateStudioInfo({
      name: data.name,
      description: data.description,
      controller,
      accessToken,
    }), {
      onSuccess: () => {
        setEditableData(data);
        showToast({ message: UPDATE_STUDIO_INFO_SUCCEEDED });
        setIsEditing(false);
      },
      onError: () => {
        showToast({ message: UPDATE_STUDIO_INFO_FAILED });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => { handleUpdateStudioInfo(data); })}
      className={studioInfoStyle.container}
    >
      <div className={studioInfoStyle.channelImage}>
        <ChannelImage
          channelName={name}
          url={picture}
        />
      </div>
      {isEditing
        ? (
          <div className={studioInfoStyle.input}>
            <label htmlFor="채널 이름">
              채널 이름
            </label>
            <Input
              id="채널 이름"
              {...register('name', {
                required: {
                  value: true,
                  message: ERR_MSG_EMPTY_CHANNEL_NAME,
                },
                maxLength: {
                  value: CHANNEL_NAME_LIMIT,
                  message: ERR_MSG_CHANNEL_NAME_LIMIT_EXCEEDED,
                },
              })}
              error={formState.errors.name !== undefined}
              maxLength={CHANNEL_NAME_LIMIT}
              autoTrim
              defaultValueLength={name.length}
            />
            {formState.errors.name ? <div className={formStyle.error}>{formState.errors.name.message}</div> : null}
          </div>
        )
        : (
          <StudioInfoSection title="채널 이름">
            {editableData.name}
          </StudioInfoSection>
        )}
      <StudioInfoSection title="이메일">
        {email}
      </StudioInfoSection>
      {isEditing
        ? (
          <div className={studioInfoStyle.input}>
            <label htmlFor="채널 설명">
              채널 설명
            </label>
            <Textarea
              id="채널 설명"
              {...register('description', {
                maxLength: {
                  value: CHANNEL_DESCRIPTION_LIMIT,
                  message: ERR_MSG_CHANNEL_DESCRIPTION_LIMIT_EXCEEDED,
                },
              })}
              error={formState.errors.description !== undefined}
              maxLength={CHANNEL_DESCRIPTION_LIMIT}
              defaultValueLength={description.length}
            />
            {formState.errors.description ? <div className={formStyle.error}>{formState.errors.description.message}</div> : null}
          </div>
        )
        : (
          <StudioInfoSection title="채널 설명">
            {editableData.description}
          </StudioInfoSection>
        )}
      <StudioInfoSection title="채널 개설일">
        {formatDateString(createdDate)}
      </StudioInfoSection>
      <div className={studioInfoStyle.button}>
        {isEditing
          ? (
            <>
              <button
                className={buttonStyle.small}
                type="button"
                onClick={() => setIsEditing(false)}
              >
                취소
              </button>
              <button
                className={buttonStyle.small}
                type="submit"
              >
                완료
              </button>
            </>
          )
          : (
            <button
              className={buttonStyle.small}
              type="button"
              onClick={() => setIsEditing(true)}
            >
              수정
            </button>
          )}
      </div>
    </form>
  );
}
