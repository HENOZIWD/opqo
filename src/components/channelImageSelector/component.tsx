import Image from 'next/image';
import styles from './style.module.css';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { isValidImageSize, isValidImageType } from '@/utils/image';

interface ChannelImageSelectorProps { setImageData: Dispatch<SetStateAction<Blob | null>> }

export default function ChannelImageSelector({ setImageData }: ChannelImageSelectorProps) {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) {
      return;
    }

    if (fileList.length > 0) {
      if (!isValidImageType(fileList[0].type)) {
        return;
      }

      if (!isValidImageSize(fileList[0].size)) {
        return;
      }

      const url = URL.createObjectURL(fileList[0]);

      setImageData(fileList[0]);
      setPreviewImageUrl(url);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.previewWrapper}>
        <Image
          className={styles.preview}
          src={previewImageUrl || '/assets/lightgray.png'}
          alt="프로필 이미지 미리보기"
          fill
        />
      </div>
      <input
        type="file"
        id="channelImageSelector"
        className={styles.input}
        onChange={handleUploadImage}
      />
      <label
        htmlFor="channelImageSelector"
        className={styles.label}
      >
        채널 프로필 이미지 선택
      </label>
    </div>
  );
}
