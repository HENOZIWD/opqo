'use client';

import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { isValidImageSize, isValidImageType } from '@/utils/image';
import { ERR_MSG_FILE_LOAD_ERROR, ERR_MSG_INVALID_IMAGE_SIZE, ERR_MSG_INVALID_IMAGE_TYPE } from '@/utils/message';
import { useToast } from '@/hooks/useToast';
import { channelImageSelectorStyle } from '@/styles/form.css';

interface ChannelImageSelectorProps { setImageData: Dispatch<SetStateAction<Blob | null>> }

export default function ChannelImageSelector({ setImageData }: ChannelImageSelectorProps) {
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
    <div className={channelImageSelectorStyle.container}>
      <div className={channelImageSelectorStyle.inputWrapper}>
        <div className={channelImageSelectorStyle.previewWrapper}>
          <Image
            className={channelImageSelectorStyle.preview}
            src={imagePreviewUrl || '/assets/lightgray.png'}
            alt="프로필 이미지 미리보기"
            fill
          />
        </div>
        <input
          type="file"
          id="channelImageSelector"
          className={channelImageSelectorStyle.input}
          onChange={handleUploadImage}
          accept="image/jpeg,image/png,image/webp"
        />
        <label
          htmlFor="channelImageSelector"
          className={channelImageSelectorStyle.label}
        >
          채널 프로필 이미지 선택
        </label>
      </div>
    </div>
  );
}
