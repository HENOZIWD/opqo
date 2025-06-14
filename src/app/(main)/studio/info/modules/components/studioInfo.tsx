import { formatDateString } from '@/utils/date';
import ChannelImage from '@/components/channel/channelImage';
import { studioInfoStyle } from '../styles/studioInfoStyle.css';
import StudioInfoSection from '../../../modules/components/studioInfoSection';
import EditableStudioInfoSection from './editableStudioInfoSection';

interface StudioInfoProps {
  email: string;
  name: string;
  description: string;
  createdDate: string;
  picture: string;
}

export default function StudioInfo({
  email,
  name,
  description,
  createdDate,
  picture,
}: StudioInfoProps) {
  return (
    <div className={studioInfoStyle.container}>
      <div className={studioInfoStyle.channelImage}>
        <ChannelImage
          channelName={name}
          url={picture}
        />
      </div>
      <EditableStudioInfoSection
        title="채널 이름"
        content={name}
        infoKey="name"
      />
      <StudioInfoSection title="이메일">
        {email}
      </StudioInfoSection>
      <EditableStudioInfoSection
        title="채널 설명"
        content={description !== '' ? description : '채널 설명이 없습니다.'}
        multiline
        infoKey="description"
      />
      <StudioInfoSection title="채널 개설일">
        {formatDateString(createdDate)}
      </StudioInfoSection>
    </div>
  );
}
