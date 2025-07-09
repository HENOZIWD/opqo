'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import { formStyle } from '@/styles/form.css';
import VideoUploader from './videoUploader';
import ThumbnailSelector from './thumbnailSelector';
import { ERR_MSG_EMPTY_VIDEO_TITLE, ERR_MSG_VIDEO_DESCRIPTION_LIMIT_EXCEEDED, ERR_MSG_VIDEO_TITLE_LIMIT_EXCEEDED, ERR_MSG_VIDEO_UPLOAD_FAILED } from '../utils/message';
import { uploadVideoContent } from '../apis/uploadVideoContent';
import { UploadVideoContent } from '../utils/type';
import { buttonStyle } from '@/styles/common/buttonStyle.css';
import Input from '@/components/common/input';
import Textarea from '@/components/common/textarea';

const VIDEO_TITLE_LIMIT = 100;
const VIDEO_DESCRIPTION_LIMIT = 5000;

export default function UploadVideoForm() {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<UploadVideoContent>({ mode: 'all' });

  const router = useRouter();

  const [videoId, setVideoId] = useState<string | null>(null);
  const [thumbnailData, setThumbnailData] = useState<Blob | null>(null);
  const [isVideoUploadComplete, setIsVideoUploadComplete] = useState<boolean>(false);

  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  const handleUploadVideoContent = async (data: UploadVideoContent) => {
    if (!isVideoUploadComplete) {
      return;
    }

    if (!videoId || !thumbnailData) {
      showToast({
        message: ERR_MSG_VIDEO_UPLOAD_FAILED,
        type: 'error',
      });

      return;
    }

    fetchHandler(({
      controller,
      accessToken,
    }) => uploadVideoContent({
      thumbnailImage: thumbnailData,
      videoId,
      title: data.title,
      description: data.description,
      controller,
      accessToken,
    }), {
      onSuccess: () => {
        router.push('/');
      },
      onError: () => {
        showToast({
          message: ERR_MSG_VIDEO_UPLOAD_FAILED,
          type: 'error',
        });
      },
    });
  };

  return (
    <div>
      <VideoUploader
        isVideoUploadComplete={isVideoUploadComplete}
        setIsVideoUploadComplete={setIsVideoUploadComplete}
        setThumbnailData={setThumbnailData}
        videoId={videoId}
        setVideoId={setVideoId}
      />
      <ThumbnailSelector setImageData={setThumbnailData} />
      <form
        onSubmit={handleSubmit((data) => { handleUploadVideoContent(data); })}
        className={formStyle.container}
      >
        <label htmlFor="title">
          동영상 제목
        </label>
        <Input
          id="title"
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
          error={formState?.errors?.title !== undefined}
          maxLength={VIDEO_TITLE_LIMIT}
          autoTrim
        />
        {formState?.errors?.title && <div className={formStyle.error}>{formState.errors.title?.message}</div>}
        <label htmlFor="description">
          동영상 설명
        </label>
        <Textarea
          id="description"
          {...register('description', {
            maxLength: {
              value: VIDEO_DESCRIPTION_LIMIT,
              message: ERR_MSG_VIDEO_DESCRIPTION_LIMIT_EXCEEDED,
            },
          })}
          error={formState?.errors?.description !== undefined}
          maxLength={VIDEO_DESCRIPTION_LIMIT}
        />
        {formState?.errors?.description && <div className={formStyle.error}>{formState.errors.description?.message}</div>}
        {isVideoUploadComplete
          ? (
            <div className={formStyle.submit}>
              <button
                className={buttonStyle.default}
                type="submit"
              >
                업로드
              </button>
            </div>
          )
          : null}
      </form>
    </div>
  );
}
