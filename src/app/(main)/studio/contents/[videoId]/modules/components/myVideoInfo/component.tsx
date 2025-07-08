import { numberToTime } from '@/utils/time';
import { numberToFileSize } from '@/utils/convert';
import { formatDateTimeString } from '@/utils/date';
import Thumbnail from '@/components/video/thumbnail/component';
import { myVideoInfoStyle } from './style.css';
import StudioInfoSection from '@/app/(main)/studio/modules/components/studioInfoSection/component';

interface MyVideoInfoProps {
  id: string;
  width: number;
  height: number;
  duration: number;
  size: number;
  extension: string;
  createdDate: string;
  title: string;
  description: string;
  isUploaded: boolean;
}

export default function MyVideoInfo({
  id,
  width,
  height,
  duration,
  size,
  extension,
  createdDate,
  title,
  description,
  isUploaded,
}: MyVideoInfoProps) {
  return (
    <div className={myVideoInfoStyle.container}>
      <div className={myVideoInfoStyle.thumbnail}>
        <Thumbnail
          videoId={id}
          videoTitle={title}
        />
      </div>
      <StudioInfoSection title="동영상 제목">
        {title}
      </StudioInfoSection>
      <StudioInfoSection title="해상도">
        {`${width} X ${height}`}
      </StudioInfoSection>
      <StudioInfoSection title="동영상 길이">
        {numberToTime(duration)}
      </StudioInfoSection>
      <StudioInfoSection title="동영상 크기">
        {numberToFileSize(size)}
      </StudioInfoSection>
      <StudioInfoSection title="확장자">
        {extension}
      </StudioInfoSection>
      <StudioInfoSection title="업로드 상태">
        {isUploaded ? '업로드 완료' : '업로드 중'}
      </StudioInfoSection>
      <StudioInfoSection title="생성한 날짜">
        {formatDateTimeString(createdDate)}
      </StudioInfoSection>
      <StudioInfoSection title="동영상 설명">
        {description}
      </StudioInfoSection>
    </div>
  );
}
