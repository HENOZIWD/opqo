'use client';

import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './style.module.css';
import { captureRandomThumbnailFromVideo, extractMetadataFromVideo, generateVideoChunkList, generateVideoHash, isValidVideoSize, isValidVideoType } from '@/utils/video';
import VideoPlayer from '../videoPlayer/component';
import { ERR_MSG_FILE_LOAD_ERROR, ERR_MSG_INTERNAL_SERVER, ERR_MSG_INVALID_VIDEO_SIZE, ERR_MSG_INVALID_VIDEO_TYPE, ERR_MSG_VIDEO_UPLOAD_FAILED } from '@/utils/message';
import { checkVideoChunkExist, createVideoMetadata, readyVideoUpload, uploadVideoChunk } from '@/apis/video';
import { VIDEO_CHUNK_SIZE } from '@/utils/constant';
import ProgressBar from '../progressBar/component';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from '@/hooks/useToast';

interface VideoUploaderProps {
  isVideoUploadComplete: boolean;
  setIsVideoUploadComplete: Dispatch<SetStateAction<boolean>>;
  videoId: string | null;
  setVideoId: Dispatch<SetStateAction<string | null>>;
  setThumbnailData: Dispatch<SetStateAction<Blob | null>>;
}

export default function VideoUploader({
  isVideoUploadComplete,
  setIsVideoUploadComplete,
  videoId,
  setVideoId,
  setThumbnailData,
}: VideoUploaderProps) {
  const [videoData, setVideoData] = useState<Blob | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');

  const [isUploadPrepared, setIsUploadPrepared] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadRequestProgress, setUploadRequestProgress] = useState<number>(0);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [maxUploadProgress, setMaxUploadProgress] = useState<number>(1);

  const [isUploadProcessDone, setIsUploadProcessDone] = useState<boolean>(false);

  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  useEffect(() => {
    const uploadVideo = async () => {
      if (!videoData || !videoId) {
        showToast({
          message: ERR_MSG_FILE_LOAD_ERROR,
          type: 'error',
        });

        return;
      }

      const totalVideoChunkCount = Math.ceil(videoData.size / VIDEO_CHUNK_SIZE);

      setIsUploading(true);
      setUploadProgress(0);
      setMaxUploadProgress(totalVideoChunkCount + 1);

      const videoChunkList = await generateVideoChunkList(videoData, totalVideoChunkCount);

      await Promise.allSettled(videoChunkList.map(async (currentVideoChunk, chunkIndex) => {
        fetchHandler(({
          controller,
          accessToken,
        }) => checkVideoChunkExist({
          videoId,
          chunkIndex,
          controller,
          accessToken,
        }), {
          onSuccess: () => {
            setUploadProgress((prev) => prev + 1);
          },
          onError: async () => {
            let successFlag = false;
            let retryCount = 0;

            while (!successFlag && retryCount < 3) {
              await new Promise<void>((resolve, reject) => {
                fetchHandler(({
                  controller,
                  accessToken,
                }) => uploadVideoChunk({
                  videoId,
                  chunkIndex,
                  chunkFile: currentVideoChunk,
                  controller,
                  accessToken,
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
          onFinal: () => { setUploadRequestProgress((prev) => prev + 1); },
        });
      }));
    };

    if (!isUploading && isUploadPrepared && videoData && videoId) {
      uploadVideo();
    }
  }, [isUploadPrepared, videoData, videoId, fetchHandler]);

  useEffect(() => {
    if (isUploading && uploadRequestProgress + 1 === maxUploadProgress) {
      setIsUploadProcessDone(true);
    }
  }, [isUploading, uploadRequestProgress, maxUploadProgress]);

  useEffect(() => {
    (async () => {
      if (!isUploadProcessDone || !videoId) {
        return;
      }

      await fetchHandler(({
        controller,
        accessToken,
      }) => readyVideoUpload({
        videoId,
        controller,
        accessToken,
      }), {
        onSuccess: () => {
          setUploadProgress(maxUploadProgress);
          setIsVideoUploadComplete(true);
        },
        onError: () => {
          showToast({
            message: ERR_MSG_VIDEO_UPLOAD_FAILED,
            type: 'error',
          });
        },
      });
    })();
  }, [isUploadProcessDone]);

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

        await fetchHandler(({
          controller,
          accessToken,
        }) => createVideoMetadata({
          hash: videoHash,
          width: videoMetadata.width,
          height: videoMetadata.height,
          duration: videoMetadata.duration,
          extension: videoMetadata.extension,
          size: videoFile.size,
          controller,
          accessToken,
        }), {
          onSuccess: (response) => {
            if (response?.data.videoId) {
              setVideoId(response.data.videoId);
            }
            setIsUploadPrepared(true);
          },
          onError: () => {
            showToast({
              message: ERR_MSG_INTERNAL_SERVER,
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
            {isUploadProcessDone
              ? (isVideoUploadComplete ? <div>동영상 업로드 완료</div> : <div>동영상 업로드 실패</div>)
              : <div>동영상 업로드 중</div>}
            <ProgressBar
              current={uploadProgress}
              max={maxUploadProgress}
            />
          </div>
        )}
    </div>
  );
}
