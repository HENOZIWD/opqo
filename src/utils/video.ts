export function isValidVideoType(fileType: string) {
  return fileType === 'video/mp4'
    || fileType === 'video/webm';
}

export function isValidVideoSize(fileSize: number) {
  return fileSize <= 1024 * 1024 * 1024; // 1GB
}
