import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './style.module.css';
import { captureRandomThumbnailFromVideo, extractMetadataFromVideo, generateVideoChunkList, generateVideoHash, isValidVideoSize, isValidVideoType } from '@/utils/video';
import VideoPlayer from '../videoPlayer/component';
import { ERR_MSG_FILE_LOAD_ERROR, ERR_MSG_INVALID_VIDEO_SIZE, ERR_MSG_INVALID_VIDEO_TYPE, ERR_MSG_VIDEO_UPLOAD_FAILED } from '@/utils/message';
import { checkVideoChunkExist, prepareVideoUpload, uploadVideoChunk } from '@/apis/video';
import { VIDEO_CHUNK_SIZE } from '@/utils/constant';
import ProgressBar from '../progressBar/component';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';

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

  const [isUploadPrepared, setIsUploadPrepared] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [maxUploadProgress, setMaxUploadProgress] = useState<number>(1);

  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  useEffect(() => {
    const uploadVideo = async () => {
      if (!videoData || !videoHash) {
        showToast({
          message: ERR_MSG_FILE_LOAD_ERROR,
          type: 'error',
        });

        return;
      }

      const totalVideoChunkCount = Math.ceil(videoData.size / VIDEO_CHUNK_SIZE);

      setIsUploading(true);
      setUploadProgress(0);
      setMaxUploadProgress(totalVideoChunkCount);

      const videoChunkList = await generateVideoChunkList(videoData, totalVideoChunkCount);

      await Promise.allSettled(videoChunkList.map(async (currentVideoChunk, chunkIndex) => {
        fetchHandler((controller) => checkVideoChunkExist({
          videoHash,
          chunkIndex,
          controller,
        }), {
          onSuccess: () => {
            setUploadProgress((prev) => prev + 1);
          },
          onError: async () => {
            let successFlag = false;
            let retryCount = 0;

            while (!successFlag && retryCount < 3) {
              await new Promise<void>((resolve, reject) => {
                fetchHandler((controller) => uploadVideoChunk({
                  videoHash,
                  chunkIndex,
                  chunkFile: currentVideoChunk,
                  controller,
                }), {
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

    if (!isUploading && isUploadPrepared && videoData && videoHash) {
      uploadVideo();
    }
  }, [isUploadPrepared, videoData, videoHash, fetchHandler]);

  useEffect(() => {
    if (uploadProgress === maxUploadProgress) {
      setIsVideoUploadComplete(true);
    }
  }, [uploadProgress, maxUploadProgress, setIsVideoUploadComplete]);

  const handleSelectVideo = (e: ChangeEvent<HTMLInputElement>) => {
    if (isUploading) {
      return;
    }

    const fileList = e.target.files;

    if (!fileList || !fileList[0]) {
      showToast({
        message: ERR_MSG_FILE_LOAD_ERROR,
        type: 'error',
      });
      return;
    }

    if (fileList.length > 0) {
      const videoFile = fileList[0];

      if (!isValidVideoType(videoFile.type)) {
        showToast({
          message: ERR_MSG_INVALID_VIDEO_TYPE,
          type: 'error',
        });
        return;
      }

      if (!isValidVideoSize(videoFile.size)) {
        showToast({
          message: ERR_MSG_INVALID_VIDEO_SIZE,
          type: 'error',
        });
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
          showToast({
            message: ERR_MSG_FILE_LOAD_ERROR,
            type: 'error',
          });

          return;
        }

        const videoHash = await generateVideoHash(videoFile);
        setVideoHash(videoHash);

        await fetchHandler((controller) => prepareVideoUpload({
          hashValue: videoHash,
          width: videoMetadata.videoWidth,
          height: videoMetadata.videoHeight,
          duration: videoMetadata.videoDuration,
          extension: videoMetadata.videoExtension,
          controller,
        }), {
          onSuccess: () => { setIsUploadPrepared(true); },
          onError: () => {
            showToast({
              message: ERR_MSG_VIDEO_UPLOAD_FAILED,
              type: 'error',
            });
          },
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
    </div>
  );
}
