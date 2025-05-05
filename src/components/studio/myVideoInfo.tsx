import { numberToTime } from '@/utils/time';
import Thumbnail from '../video/thumbnail';
import { numberToFileSize } from '@/utils/convert';
import { formatDateTimeString } from '@/utils/date';
import { myVideoInfoStyle, studioInfoSectionStyle } from '@/styles/studio.css';
import StudioInfoSection from './studioInfoSection';

interface MyVideoInfoProps {
  id: string;
  width: number;
  height: number;
  duration: number;
  size: number;
  extension: string;
  status: string;
  createdDate: string;
  title: string;
  description: string;
}

export default function MyVideoInfo({
  id,
  width,
  height,
  duration,
  size,
  extension,
  status,
  createdDate,
  title,
  description,
}: MyVideoInfoProps) {
  return (
    <div className={myVideoInfoStyle.container}>
      <div className={myVideoInfoStyle.thumbnail}>
        <Thumbnail
          videoId={id}
          videoTitle={title}
        />
      </div>
      <div className={myVideoInfoStyle.info}>
        <section className={studioInfoSectionStyle.container}>
          <h2 className={studioInfoSectionStyle.title}>채널 이름</h2>
          <p className={myVideoInfoStyle.title}>{title}</p>
        </section>
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
        <StudioInfoSection title="상태">
          {status}
        </StudioInfoSection>
        <StudioInfoSection title="생성한 날짜">
          {formatDateTimeString(createdDate)}
        </StudioInfoSection>
        <StudioInfoSection title="동영상 설명">
          {description}
        </StudioInfoSection>
      </div>
    </div>
  );
}
