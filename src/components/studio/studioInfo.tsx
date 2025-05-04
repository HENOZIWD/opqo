import { formatDateString } from '@/utils/date';
import ChannelImage from '@/components/channel/channelImage';
import { studioInfoStyle } from '@/styles/studio.css';

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
      <section className={studioInfoStyle.category}>
        <h2 className={studioInfoStyle.categoryTitle}>채널 이름</h2>
        <p className={studioInfoStyle.channelName}>{name}</p>
      </section>
      <section className={studioInfoStyle.category}>
        <h2 className={studioInfoStyle.categoryTitle}>채널 설명</h2>
        <p className={studioInfoStyle.categoryContent}>{description}</p>
      </section>
      <section className={studioInfoStyle.category}>
        <h2 className={studioInfoStyle.categoryTitle}>채널 개설일</h2>
        <p className={studioInfoStyle.categoryContent}>{formatDateString(createdDate)}</p>
      </section>
    </div>
  );
}
