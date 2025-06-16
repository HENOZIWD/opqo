import { formatDateString } from '@/utils/date';
import ChannelImage from '@/components/channel/channelImage';
import { studioInfoStyle } from '../styles/studioInfoStyle.css';
import { studioInfoSectionStyle } from '../../../modules/styles/studioInfoSectionStyle.css';
import StudioInfoSection from '../../../modules/components/studioInfoSection';

interface StudioInfoProps {
  id: string;
  name: string;
  description: string;
  createdDate: string;
}

export default function StudioInfo({
  id,
  name,
  description,
  createdDate,
}: StudioInfoProps) {
  return (
    <div className={studioInfoStyle.container}>
      <div className={studioInfoStyle.channelImage}>
        <ChannelImage
          channelId={id}
          channelName={name}
        />
      </div>
      <section className={studioInfoSectionStyle.container}>
        <h2 className={studioInfoSectionStyle.title}>채널 이름</h2>
        <p className={studioInfoStyle.channelName}>{name}</p>
      </section>
      <StudioInfoSection title="채널 설명">
        {description}
      </StudioInfoSection>
      <StudioInfoSection title="채널 개설일">
        {formatDateString(createdDate)}
      </StudioInfoSection>
    </div>
  );
}
