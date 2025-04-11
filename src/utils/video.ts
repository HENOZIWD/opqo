import { VIDEO_CHUNK_SIZE, VIDEO_UPLOAD_LIMIT_SIZE } from './constant';
import { VideoMetadata } from './type';

export function isValidVideoType(fileType: string) {
  return fileType === 'video/mp4'
    || fileType === 'video/webm';
}

export function isValidVideoSize(fileSize: number) {
  return fileSize <= VIDEO_UPLOAD_LIMIT_SIZE;
}

export async function generateVideoHash(blobData: Blob) {
  const buffer = await blobData.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = new Uint8Array(hashBuffer);
  const base64Hash = btoa(String.fromCharCode(...hashArray));

  return base64Hash;
}

export async function generateVideoChunkList(videoData: Blob, totalChunkCount: number) {
  const chunkList = Array.from(
    { length: totalChunkCount },
    (_, i) => videoData.slice(i * VIDEO_CHUNK_SIZE, (i + 1) * VIDEO_CHUNK_SIZE, videoData.type),
  );

  return chunkList;
}

export function captureRandomThumbnailFromVideo(videoData: Blob, callback: (thumbnailData: Blob | null) => void) {
  const videoUrl = URL.createObjectURL(videoData);

  const video = document.createElement('video');
  video.preload = 'metadata';
  video.src = videoUrl;
  video.crossOrigin = process.env.NEXT_PUBLIC_ORIGIN || null;

  video.onloadedmetadata = () => {
    const randomCaptureTime = Math.floor(Math.random() * (Math.floor(video.duration) - 1) + 1);

    video.currentTime = randomCaptureTime;
  };

  video.onseeked = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((thumbnailData) => callback(thumbnailData), 'image/png');

    cleanup();
  };

  video.onerror = () => {
    callback(null);

    cleanup();
  };

  function cleanup() {
    URL.revokeObjectURL(videoUrl);
    video.remove();
  }
}

export function extractMetadataFromVideo(videoData: Blob, extension: string, callback: (extractedMetadata: VideoMetadata | null) => void) {
  const videoUrl = URL.createObjectURL(videoData);

  const video = document.createElement('video');
  video.preload = 'metadata';
  video.src = videoUrl;
  video.crossOrigin = process.env.NEXT_PUBLIC_ORIGIN || null;

  video.onloadedmetadata = () => {
    callback({
      width: video.videoWidth,
      height: video.videoHeight,
      duration: video.duration,
      extension,
    });

    cleanup();
  };

  video.onerror = () => {
    callback(null);

    cleanup();
  };

  function cleanup() {
    URL.revokeObjectURL(videoUrl);
    video.remove();
  }
}
