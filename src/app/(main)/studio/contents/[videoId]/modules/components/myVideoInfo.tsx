'use client';

import { numberToFileSize, numberToTime } from '@/utils/convert';
import { formatDateTimeString } from '@/utils/dateFormat';
import Thumbnail from '@/components/video/thumbnail';
import { myVideoInfoStyle } from '../styles/myVideoInfoStyle.css';
import { studioInfoSectionStyle } from '@/app/(main)/studio/modules/styles/studioInfoSectionStyle.css';
import StudioInfoSection from '@/app/(main)/studio/modules/components/studioInfoSection';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Input from '@/components/common/input';
import { ERR_MSG_EMPTY_VIDEO_TITLE, ERR_MSG_VIDEO_DESCRIPTION_LIMIT_EXCEEDED, ERR_MSG_VIDEO_TITLE_LIMIT_EXCEEDED } from '@/utils/message';
import { VIDEO_DESCRIPTION_LIMIT, VIDEO_TITLE_LIMIT } from '@/utils/constant';
import Textarea from '@/components/common/textarea';
import { buttonStyle } from '@/styles/common/buttonStyle.css';
import { formStyle } from '@/styles/common/formStyle.css';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import { updateMyVideoInfo } from '../apis/updateMyVideoInfo';

interface MyVideoInfoProps {
  id: string;
  width: number;
  height: number;
  duration: number;
  size: number;
  extension: string;
  createdDate: string;
  title: string;
  description: string;
  isUploaded: boolean;
}

interface UpdateVideoInfo {
  title: string;
  description: string;
}

const UPDATE_VIDEO_INFO_SUCCEEDED = '동영상 정보 수정이 완료되었습니다.';
const UPDATE_VIDEO_INFO_FAILED = '동영상 정보 수정에 실패했습니다.';

export default function MyVideoInfo({
  id,
  width,
  height,
  duration,
  size,
  extension,
  createdDate,
  title,
  description,
  isUploaded,
}: MyVideoInfoProps) {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<UpdateVideoInfo>({
    mode: 'all',
    defaultValues: {
      title,
      description,
    },
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableData, setEditableData] = useState<UpdateVideoInfo>({
    title,
    description,
  });

  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  const handleUpdateVideoInfo = async (data: UpdateVideoInfo) => {
    if (!isEditing) {
      return;
    }

    fetchHandler(({
      accessToken,
      controller,
    }) => updateMyVideoInfo({
      id,
      title: data.title,
      description: data.description,
      accessToken,
      controller,
    }), {
      onSuccess: () => {
        setEditableData(data);
        showToast({ message: UPDATE_VIDEO_INFO_SUCCEEDED });
        setIsEditing(false);
      },
      onError: () => {
        showToast({
          message: UPDATE_VIDEO_INFO_FAILED,
          type: 'error',
        });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => { handleUpdateVideoInfo(data); })}
      className={myVideoInfoStyle.container}
    >
      <div className={myVideoInfoStyle.thumbnail}>
        <Thumbnail
          videoId={id}
          videoTitle={title}
        />
      </div>
      {isEditing
        ? (
          <div className={myVideoInfoStyle.input}>
            <label htmlFor="동영상 제목">동영상 제목</label>
            <Input
              id="동영상 제목"
              {...register('title', {
                required: {
                  value: true,
                  message: ERR_MSG_EMPTY_VIDEO_TITLE,
                },
                maxLength: {
                  value: VIDEO_TITLE_LIMIT,
                  message: ERR_MSG_VIDEO_TITLE_LIMIT_EXCEEDED,
                },
              })}
              error={formState.errors.title !== undefined}
              maxLength={VIDEO_TITLE_LIMIT}
              autoTrim
              defaultValueLength={editableData.title.length}
            />
            {formState.errors.title ? <div className={formStyle.error}>{formState.errors.title.message}</div> : null}
          </div>
        )
        : (
          <section className={studioInfoSectionStyle.container}>
            <h2 className={studioInfoSectionStyle.title}>동영상 제목</h2>
            <p className={myVideoInfoStyle.title}>{editableData.title}</p>
          </section>
        )}
      <StudioInfoSection title="해상도">
        {`${width} X ${height}`}
      </StudioInfoSection>
      <StudioInfoSection title="동영상 길이">
        {numberToTime(duration)}
      </StudioInfoSection>
      <StudioInfoSection title="동영상 크기">
        {numberToFileSize(size)}
      </StudioInfoSection>
      <StudioInfoSection title="확장자">
        {extension}
      </StudioInfoSection>
      <StudioInfoSection title="업로드 상태">
        {isUploaded ? '업로드 완료' : '업로드 중'}
      </StudioInfoSection>
      <StudioInfoSection title="생성한 날짜">
        {formatDateTimeString(createdDate)}
      </StudioInfoSection>
      {isEditing
        ? (
          <div className={myVideoInfoStyle.input}>
            <label htmlFor="동영상 설명">동영상 설명</label>
            <Textarea
              id="동영상 설명"
              {...register('description', {
                maxLength: {
                  value: VIDEO_DESCRIPTION_LIMIT,
                  message: ERR_MSG_VIDEO_DESCRIPTION_LIMIT_EXCEEDED,
                },
              })}
              error={formState.errors.description !== undefined}
              maxLength={VIDEO_DESCRIPTION_LIMIT}
              defaultValueLength={editableData.description.length}
            />
            {formState.errors.description ? <div className={formStyle.error}>{formState.errors.description.message}</div> : null}
          </div>
        )
        : (
          <StudioInfoSection title="동영상 설명">
            {editableData.description}
          </StudioInfoSection>
        )}
      <div className={myVideoInfoStyle.button}>
        {isEditing
          ? (
            <>
              <button
                key="취소"
                className={buttonStyle.small}
                type="button"
                onClick={() => setIsEditing(false)}
              >
                취소
              </button>
              <button
                key="완료"
                className={buttonStyle.small}
                type="submit"
              >
                완료
              </button>
            </>
          )
          : (
            <button
              key="수정"
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
