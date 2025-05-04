'use client';

import CustomButton from '@/components/common/customButton';
import { UploadVideoContent } from '@/utils/type';
import { useForm } from 'react-hook-form';
import CustomInput from '@/components/common/customInput';
import { ERR_MSG_EMPTY_VIDEO_TITLE, ERR_MSG_VIDEO_UPLOAD_FAILED } from '@/utils/message';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ThumbnailSelector from '@/components/form/thumbnailSelector';
import VideoUploader from '@/components/form/videoUploader';
import { uploadVideoContent } from '@/apis/video';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import { formStyle } from '@/styles/form.css';

export default function UploadVideoForm() {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<UploadVideoContent>();

  const router = useRouter();

  const [videoId, setVideoId] = useState<string | null>(null);
  const [thumbnailData, setThumbnailData] = useState<Blob | null>(null);
  const [isVideoUploadComplete, setIsVideoUploadComplete] = useState<boolean>(false);

  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  const handleUploadVideoContent = async (data: UploadVideoContent) => {
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
      title: data.videoTitle,
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
        videoId={videoId}
        setVideoId={setVideoId}
        setThumbnailData={setThumbnailData}
      />
      <ThumbnailSelector setImageData={setThumbnailData} />
      <form
        onSubmit={handleSubmit((data) => { handleUploadVideoContent(data); })}
        className={formStyle.container}
      >
        <label htmlFor="videoTitle">
          동영상 제목
        </label>
        <CustomInput
          id="videoTitle"
          type="text"
          {...register('videoTitle', {
            required: {
              value: true,
              message: ERR_MSG_EMPTY_VIDEO_TITLE,
            },
          })}
          error={formState?.errors?.videoTitle !== undefined}
        />
        {formState?.errors?.videoTitle && <div className={formStyle.error}>{formState.errors.videoTitle?.message}</div>}
        <label htmlFor="description">
          동영상 설명
        </label>
        <CustomInput
          id="description"
          type="text"
          {...register('description')}
        />
        {isVideoUploadComplete
          ? (
            <div className={formStyle.submit}>
              <CustomButton
                type="submit"
                content="업로드"
              />
            </div>
          )
          : null}
      </form>
    </div>
  );
}
