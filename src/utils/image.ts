export function isValidImageType(fileType: string) {
  return fileType === 'image/jpeg'
    || fileType === 'image/png'
    || fileType === 'image/webp';
}

export function isValidImageSize(fileSize: number) {
  return fileSize <= 5 * 1024 * 1024; // 5MB
}
