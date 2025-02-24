'use client';

import CustomButton from '@/components/customButton/component';
import styles from './page.module.css';
import { UploadVideoContent } from '@/utils/type';
import { useForm } from 'react-hook-form';
import CustomInput from '@/components/customInput/component';
import { ERR_MSG_EMPTY_VIDEO_TITLE, ERR_MSG_VIDEO_UPLOAD_FAILED } from '@/utils/message';
import { useState } from 'react';
import { fetchHandler } from '@/utils/fetchHandler';
import { useRouter } from 'next/navigation';
import ThumbnailSelector from '@/components/thumbnailSelector/component';
import VideoUploader from '@/components/videoUploader/component';
import { uploadVideoContent } from '@/apis/video';

export default function UploadVideoPage() {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<UploadVideoContent>();

  const router = useRouter();

  const [videoHash, setVideoHash] = useState<string | null>(null);
  const [thumbnailData, setThumbnailData] = useState<Blob | null>(null);

  const [isVideoUploadComplete, setIsVideoUploadComplete] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleUploadVideoContent = async (data: UploadVideoContent) => {
    if (!videoHash || !thumbnailData) {
      setErrorMessage(ERR_MSG_VIDEO_UPLOAD_FAILED);

      return;
    }

    setErrorMessage('');

    fetchHandler(() => uploadVideoContent(videoHash, thumbnailData, data), {
      onSuccess: () => {
        router.push('/');
      },
      onError: () => {
        setErrorMessage(ERR_MSG_VIDEO_UPLOAD_FAILED);
      },
    });
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>동영상 업로드</h1>
      <div className={styles.formWrapper}>
        <div className={styles.former}>
          <VideoUploader
            isVideoUploadComplete={isVideoUploadComplete}
            setIsVideoUploadComplete={setIsVideoUploadComplete}
            videoHash={videoHash}
            setVideoHash={setVideoHash}
            setThumbnailData={setThumbnailData}
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
            {formState?.errors?.videoTitle && <div className={styles.inputError}>{formState.errors.videoTitle?.message}</div>}
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
          {errorMessage && <div className={styles.plainError}>{errorMessage}</div>}
        </div>
      </div>
    </main>
  );
}
