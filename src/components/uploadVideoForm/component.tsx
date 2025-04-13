'use client';

import CustomButton from '@/components/customButton/component';
import styles from './style.module.css';
import { UploadVideoContent } from '@/utils/type';
import { useForm } from 'react-hook-form';
import CustomInput from '@/components/customInput/component';
import { ERR_MSG_EMPTY_VIDEO_TITLE, ERR_MSG_VIDEO_UPLOAD_FAILED } from '@/utils/message';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ThumbnailSelector from '@/components/thumbnailSelector/component';
import VideoUploader from '@/components/videoUploader/component';
import { uploadVideoContent } from '@/apis/video';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';
import { useToken } from '@/hooks/useToken';

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
  const { accessToken } = useToken();

  const handleUploadVideoContent = async (data: UploadVideoContent) => {
    if (!videoId || !thumbnailData) {
      showToast({
        message: ERR_MSG_VIDEO_UPLOAD_FAILED,
        type: 'error',
      });

      return;
    }

    fetchHandler((controller) => uploadVideoContent({
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
    <div className={styles.container}>
      <div className={styles.former}>
        <VideoUploader
          isVideoUploadComplete={isVideoUploadComplete}
          setIsVideoUploadComplete={setIsVideoUploadComplete}
          videoId={videoId}
          setVideoId={setVideoId}
          setThumbnailData={setThumbnailData}
          accessToken={accessToken}
        />
      </div>
      <div className={styles.latter}>
        <ThumbnailSelector setImageData={setThumbnailData} />
        <form
          onSubmit={handleSubmit((data) => { handleUploadVideoContent(data); })}
          className={styles.form}
        >
          <label
            htmlFor="videoTitle"
            className={styles.label}
          >
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
          {formState?.errors?.videoTitle && <div className={styles.error}>{formState.errors.videoTitle?.message}</div>}
          <label
            htmlFor="description"
            className={styles.label}
          >
            동영상 설명
          </label>
          <CustomInput
            id="description"
            type="text"
            {...register('description')}
          />
          {isVideoUploadComplete
            ? (
              <div className={styles.submitButton}>
                <CustomButton
                  type="submit"
                  content="업로드"
                />
              </div>
            )
            : null}
        </form>
      </div>
    </div>
  );
}
