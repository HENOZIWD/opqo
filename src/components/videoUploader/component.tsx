import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import { captureRandomThumbnailFromVideo, extractMetadataFromVideo, generateVideoChunkList, generateVideoHash, isValidVideoSize, isValidVideoType } from '@/utils/video';
import VideoPlayer from '../videoPlayer/component';
import { ERR_MSG_FILE_LOAD_ERROR, ERR_MSG_INVALID_VIDEO_SIZE, ERR_MSG_INVALID_VIDEO_TYPE, ERR_MSG_VIDEO_UPLOAD_FAILED } from '@/utils/message';
import { fetchHandler } from '@/utils/fetchHandler';
import { checkVideoChunkExist, prepareVideoUpload, uploadVideoChunk } from '@/apis/video';
import { VIDEO_CHUNK_SIZE } from '@/utils/constant';
import ProgressBar from '../progressBar/component';

interface VideoUploaderProps {
  isVideoUploadComplete: boolean;
  setIsVideoUploadComplete: Dispatch<SetStateAction<boolean>>;
  videoHash: string | null;
  setVideoHash: Dispatch<SetStateAction<string | null>>;
  setThumbnailData: Dispatch<SetStateAction<Blob | null>>;
}

export default function VideoUploader({
  isVideoUploadComplete,
  setIsVideoUploadComplete,
  videoHash,
  setVideoHash,
  setThumbnailData,
}: VideoUploaderProps) {
  const [videoData, setVideoData] = useState<Blob | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isUploadPrepared, setIsUploadPrepared] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [maxUploadProgress, setMaxUploadProgress] = useState<number>(1);

  const abortControllers = useRef<AbortController[]>([]);

  useEffect(() => {
    const uploadVideo = async () => {
      if (!videoData || !videoHash) {
        setErrorMessage(ERR_MSG_FILE_LOAD_ERROR);

        return;
      }

      abortControllers.current = [];

      const totalVideoChunkCount = Math.ceil(videoData.size / VIDEO_CHUNK_SIZE);

      setIsUploading(true);
      setUploadProgress(0);
      setMaxUploadProgress(totalVideoChunkCount);

      const videoChunkList = await generateVideoChunkList(videoData, totalVideoChunkCount);

      await Promise.allSettled(videoChunkList.map(async (currentVideoChunk, chunkIndex) => {
        const checkController = new AbortController();
        abortControllers.current.push(checkController);

        fetchHandler(() => checkVideoChunkExist(videoHash, chunkIndex, checkController), {
          onSuccess: () => {
            setUploadProgress((prev) => prev + 1);
          },
          onError: async () => {
            let successFlag = false;
            let retryCount = 0;

            while (!successFlag && retryCount < 3) {
              await new Promise<void>((resolve, reject) => {
                const uploadController = new AbortController();
                abortControllers.current.push(uploadController);

                fetchHandler(() => uploadVideoChunk(currentVideoChunk, videoHash, chunkIndex, uploadController), {
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
    };

    if (isUploadPrepared && videoData && videoHash) {
      uploadVideo();
    }

    return () => {
      abortControllers.current.forEach((controller) => {
        controller.abort();
      });
    };
  }, [isUploadPrepared, videoData, videoHash]);

  useEffect(() => {
    if (uploadProgress === maxUploadProgress) {
      setIsVideoUploadComplete(true);
    }
  }, [uploadProgress, maxUploadProgress, setIsVideoUploadComplete]);

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
      const videoFile = fileList[0];

      if (!isValidVideoType(videoFile.type)) {
        setErrorMessage(ERR_MSG_INVALID_VIDEO_TYPE);
        return;
      }

      if (!isValidVideoSize(videoFile.size)) {
        setErrorMessage(ERR_MSG_INVALID_VIDEO_SIZE);
        return;
      }

      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }

      const url = URL.createObjectURL(videoFile);

      setVideoData(videoFile);
      setVideoPreviewUrl(url);
      captureRandomThumbnailFromVideo(videoFile, (thumbnailData) => {
        setThumbnailData((prev) => {
          if (!prev) {
            return thumbnailData;
          }

          return prev;
        });
      });
      extractMetadataFromVideo(videoFile, videoFile.name.split('.')[1], async (videoMetadata) => {
        if (!videoMetadata) {
          setErrorMessage(ERR_MSG_FILE_LOAD_ERROR);

          return;
        }

        const videoHash = await generateVideoHash(videoFile);
        setVideoHash(videoHash);

        await fetchHandler(() => prepareVideoUpload(videoHash, videoMetadata), {
          onSuccess: () => { setIsUploadPrepared(true); },
          onError: () => { setErrorMessage(ERR_MSG_VIDEO_UPLOAD_FAILED); },
        });
      });
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
