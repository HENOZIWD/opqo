import axios from 'axios';

const mockInstance = axios.create({
  baseURL: '/mockApi',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export const videoGETFetcher = (url: string) => mockInstance.get(url).then((res) => res.data);

export async function getVideoUploadPresignedUrl(videoHash: string) {
  return mockInstance.post('/videoUploadPresignedUrl', { videoHash });
}

export async function uploadVideoChunk(presignedUrl: string, videoChunk: Blob) {
  return mockInstance.post('/videoChunkUpload', {
    presignedUrl,
    videoChunk,
  });
}

export async function checkUploadedVideoChunk() {
  return mockInstance.post('/checkUploadedVideoChunk');
}

export async function integrateUploadedVideo() {
  return mockInstance.post('/post200EmptyResponse');
}

export async function uploadVideoContent() {
  return mockInstance.post('/post200EmptyResponse');
}
