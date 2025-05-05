'use client';

import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { ERR_MSG_FILE_LOAD_ERROR, ERR_MSG_INVALID_IMAGE_SIZE, ERR_MSG_INVALID_IMAGE_TYPE } from '@/utils/message';
import { isValidImageSize, isValidImageType } from '@/utils/image';
import { useToast } from '@/hooks/useToast';
import { thumbnailSelectorStyle } from '@/styles/form.css';

interface ThumbnailSelectorProps { setImageData: Dispatch<SetStateAction<Blob | null>> }

export default function ThumbnailSelector({ setImageData }: ThumbnailSelectorProps) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

  const { showToast } = useToast();

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) {
      showToast({
        message: ERR_MSG_FILE_LOAD_ERROR,
        type: 'error',
      });
      return;
    }

    if (fileList.length > 0) {
      if (!isValidImageType(fileList[0].type)) {
        showToast({
          message: ERR_MSG_INVALID_IMAGE_TYPE,
          type: 'error',
        });
        return;
      }

      if (!isValidImageSize(fileList[0].size)) {
        showToast({
          message: ERR_MSG_INVALID_IMAGE_SIZE,
          type: 'error',
        });
        return;
      }

      const url = URL.createObjectURL(fileList[0]);

      setImageData(fileList[0]);
      setImagePreviewUrl(url);
    }
  };

  return (
    <div className={thumbnailSelectorStyle.container}>
      <div className={thumbnailSelectorStyle.previewWrapper}>
        <Image
          className={thumbnailSelectorStyle.preview}
          src={imagePreviewUrl || '/assets/lightgray.png'}
          alt="동영상 썸네일 미리보기"
          fill
        />
      </div>
      <input
        type="file"
        id="channelImageSelector"
        className={thumbnailSelectorStyle.input}
        onChange={handleUploadImage}
        accept="image/jpeg,image/png,image/webp"
      />
      <label
        htmlFor="channelImageSelector"
        className={thumbnailSelectorStyle.label}
      >
        {`동영상 썸네일 ${imagePreviewUrl ? '변경' : '선택'}`}
      </label>
      <div className={thumbnailSelectorStyle.description}>썸네일을 선택하지 않으면 동영상 내 무작위 장면으로 자동 설정됩니다.</div>
    </div>
  );
}
