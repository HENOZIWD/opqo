'use client';

import CustomButton from '@/components/customButton/component';
import styles from './page.module.css';
import { UploadVideoContent } from '@/utils/type';
import { useForm } from 'react-hook-form';
import CustomInput from '@/components/customInput/component';
import { ERR_MSG_EMPTY_VIDEO_TITLE, ERR_MSG_INTERNAL_SERVER } from '@/utils/message';
import VideoSelector from '@/components/videoSelector/component';
import { useState } from 'react';
import { fetchHandler } from '@/utils/fetchHandler';
import { uploadVideo } from '@/apis/video';
import { useRouter } from 'next/navigation';

export default function UploadVideoPage() {
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<UploadVideoContent>();

  const router = useRouter();

  const [videoData, setVideoData] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleUploadVideo = (data: UploadVideoContent) => {
    setErrorMessage('');

    fetchHandler(() => uploadVideo(data), {
      onSuccess: () => { router.push('/'); },
      onError: () => {
        setErrorMessage(ERR_MSG_INTERNAL_SERVER);
      },
    });
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>동영상 업로드</h1>
      <div className={styles.formWrapper}>
        <VideoSelector setVideoData={setVideoData} />
        <div>
          <form
            onSubmit={handleSubmit((data) => { handleUploadVideo(data); })}
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
            <div className={styles.submitButton}>
              <CustomButton
                type="submit"
                content="업로드"
              />
            </div>
          </form>
          {errorMessage && <div className={styles.plainError}>{errorMessage}</div>}
        </div>
      </div>
    </main>
  );
}
