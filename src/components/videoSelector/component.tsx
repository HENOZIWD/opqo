import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import styles from './style.module.css';
import { isValidVideoSize, isValidVideoType } from '@/utils/video';
import VideoPlayer from '../videoPlayer/component';
import { ERR_MSG_FILE_LOAD_ERROR, ERR_MSG_INVALID_VIDEO_SIZE, ERR_MSG_INVALID_VIDEO_TYPE } from '@/utils/message';

interface VideoSelectorProps { setVideoData: Dispatch<SetStateAction<Blob | null>> }

export default function VideoSelector({ setVideoData }: VideoSelectorProps) {
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSelectVideo = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    const fileList = e.target.files;

    if (!fileList) {
      setErrorMessage(ERR_MSG_FILE_LOAD_ERROR);
      return;
    }

    if (fileList.length > 0) {
      if (!isValidVideoType(fileList[0].type)) {
        setErrorMessage(ERR_MSG_INVALID_VIDEO_TYPE);
        return;
      }

      if (!isValidVideoSize(fileList[0].size)) {
        setErrorMessage(ERR_MSG_INVALID_VIDEO_SIZE);
        return;
      }

      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }

      const url = URL.createObjectURL(fileList[0]);

      setVideoData(fileList[0]);
      setVideoPreviewUrl(url);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.previewTitle}>미리보기</div>
      <div className={styles.preview}>
        {videoPreviewUrl && (
          <VideoPlayer
            source={videoPreviewUrl}
            title="업로드 할 동영상 미리보기"
          />
        )}
      </div>
      <input
        type="file"
        id="videoSelector"
        className={styles.input}
        accept=".mp4,.webm"
        onChange={handleSelectVideo}
      />
      <label
        htmlFor="videoSelector"
        className={styles.label}
      >
        {`업로드 할 동영상 파일 ${videoPreviewUrl ? '변경' : '선택'}`}
      </label>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>
  );
}
