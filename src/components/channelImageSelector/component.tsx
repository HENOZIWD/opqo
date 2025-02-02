import Image from 'next/image';
import styles from './style.module.css';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { isValidImageSize, isValidImageType } from '@/utils/image';
import { ERR_MSG_FILE_LOAD_ERROR, ERR_MSG_INVALID_IMAGE_SIZE, ERR_MSG_INVALID_IMAGE_TYPE } from '@/utils/message';

interface ChannelImageSelectorProps { setImageData: Dispatch<SetStateAction<Blob | null>> }

export default function ChannelImageSelector({ setImageData }: ChannelImageSelectorProps) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    const fileList = e.target.files;

    if (!fileList) {
      setErrorMessage(ERR_MSG_FILE_LOAD_ERROR);
      return;
    }

    if (fileList.length > 0) {
      if (!isValidImageType(fileList[0].type)) {
        setErrorMessage(ERR_MSG_INVALID_IMAGE_TYPE);
        return;
      }

      if (!isValidImageSize(fileList[0].size)) {
        setErrorMessage(ERR_MSG_INVALID_IMAGE_SIZE);
        return;
      }

      const url = URL.createObjectURL(fileList[0]);

      setImageData(fileList[0]);
      setImagePreviewUrl(url);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <div className={styles.previewWrapper}>
          <Image
            className={styles.preview}
            src={imagePreviewUrl || '/assets/lightgray.png'}
            alt="프로필 이미지 미리보기"
            fill
          />
        </div>
        <input
          type="file"
          id="channelImageSelector"
          className={styles.input}
          onChange={handleUploadImage}
          accept="image/jpeg,image/png,image/webp"
        />
        <label
          htmlFor="channelImageSelector"
          className={styles.label}
        >
          채널 프로필 이미지 선택
        </label>
      </div>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>
  );
}
