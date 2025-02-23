import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './style.module.css';
import { captureRandomThumbnailFromVideo, extractMetadataFromVideo, generateVideoChunkList, generateVideoHash, isValidVideoSize, isValidVideoType } from '@/utils/video';
import VideoPlayer from '../videoPlayer/component';
import { ERR_MSG_FILE_LOAD_ERROR, ERR_MSG_INVALID_VIDEO_SIZE, ERR_MSG_INVALID_VIDEO_TYPE, ERR_MSG_VIDEO_UPLOAD_FAILED } from '@/utils/message';
import { fetchHandler } from '@/utils/fetchHandler';
import { checkVideoChunkExist, prepareVideoUpload, uploadVideoChunk } from '@/apis/video';
import { VIDEO_CHUNK_SIZE } from '@/utils/constant';
import ProgressBar from '../progressBar/component';
import { VideoMetadata } from '@/utils/type';

interface VideoUploaderProps {
  isVideoUploadComplete: boolean;
  setIsVideoUploadComplete: Dispatch<SetStateAction<boolean>>;
  setVideoHash: Dispatch<SetStateAction<string | null>>;
  setThumbnailData: Dispatch<SetStateAction<Blob | null>>;
}

export default function VideoUploader({
  isVideoUploadComplete,
  setIsVideoUploadComplete,
  setVideoHash,
  setThumbnailData,
}: VideoUploaderProps) {
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [maxUploadProgress, setMaxUploadProgress] = useState<number>(1);

  const handleUploadVideo = async (videoDataFile: Blob, videoMetadata: VideoMetadata | null) => {
    if (!videoMetadata) {
      setErrorMessage(ERR_MSG_FILE_LOAD_ERROR);

      return;
    }

    const videoHash = await generateVideoHash(videoDataFile);
    setVideoHash(videoHash);

    await fetchHandler(() => prepareVideoUpload(videoHash, videoMetadata), {
      onSuccess: async () => {
        const totalVideoChunkCount = Math.ceil(videoDataFile.size / VIDEO_CHUNK_SIZE);

        setIsUploading(true);
        setUploadProgress(0);
        setMaxUploadProgress(totalVideoChunkCount);

        const videoChunkList = await generateVideoChunkList(videoDataFile, totalVideoChunkCount);

        await Promise.allSettled(videoChunkList.map(async (currentVideoChunk, chunkIndex) => {
          fetchHandler(() => checkVideoChunkExist(videoHash, chunkIndex), {
            onSuccess: () => {
              setUploadProgress((prev) => prev + 1);
            },
            onError: async () => {
              let successFlag = false;
              let retryCount = 0;

              while (!successFlag && retryCount < 3) {
                await new Promise<void>((resolve, reject) => {
                  fetchHandler(() => uploadVideoChunk(currentVideoChunk, videoHash, chunkIndex), {
                    onSuccess: () => {
                      successFlag = true;
                      setUploadProgress((prev) => prev + 1);
                      resolve();
                    },
                    onError: () => {
                      if (retryCount < 3) {
                        retryCount += 1;
                        resolve();
                      }
                      else {
                        reject();
                      }
                    },
                  });
                });
              }
            },
          });
        }));
      },
      onError: () => {
        setErrorMessage(ERR_MSG_VIDEO_UPLOAD_FAILED);
      },
    });
  };

  const handleSelectVideo = (e: ChangeEvent<HTMLInputElement>) => {
    if (isUploading) {
      return;
    }

    setErrorMessage('');
    const fileList = e.target.files;

    if (!fileList || !fileList[0]) {
      setErrorMessage(ERR_MSG_FILE_LOAD_ERROR);
      return;
    }

    if (fileList.length > 0) {
      const videoDataFile = fileList[0];

      if (!isValidVideoType(videoDataFile.type)) {
        setErrorMessage(ERR_MSG_INVALID_VIDEO_TYPE);
        return;
      }

      if (!isValidVideoSize(videoDataFile.size)) {
        setErrorMessage(ERR_MSG_INVALID_VIDEO_SIZE);
        return;
      }

      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }

      const url = URL.createObjectURL(videoDataFile);

      setVideoPreviewUrl(url);
      captureRandomThumbnailFromVideo(videoDataFile, (thumbnailData) => {
        setThumbnailData((prev) => {
          if (!prev) {
            return thumbnailData;
          }

          return prev;
        });
      });
      extractMetadataFromVideo(videoDataFile, videoDataFile.name.split('.')[1], async (extractedMetadata) => {
        await handleUploadVideo(videoDataFile, extractedMetadata);
      });
    }
  };

  useEffect(() => {
    if (uploadProgress === maxUploadProgress) {
      setIsVideoUploadComplete(true);
    }
  }, [uploadProgress, maxUploadProgress, setIsVideoUploadComplete]);

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
      {!isUploading
        ? (
          <>
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
              업로드 할 동영상 파일 선택
            </label>
          </>
        )
        : (
          <div className={styles.progress}>
            {isVideoUploadComplete ? <div>동영상 업로드 완료</div> : <div>동영상 업로드 중</div>}
            <ProgressBar
              current={uploadProgress}
              max={maxUploadProgress}
            />
          </div>
        )}
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>
  );
}
