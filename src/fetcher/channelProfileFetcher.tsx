import ChannelImage from '@/components/channel/channelImage';
import { getChannelInfo } from '@/apis/channel';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { formatDateString } from '@/utils/date';
import { channelProfileStyle } from '@/styles/channel.css';

interface ChannelProfileFetcherProps { channelId: string }

export default async function ChannelProfileFetcher({ channelId }: ChannelProfileFetcherProps) {
  const { data } = await fetchHandlerWithServerComponent(() => getChannelInfo({ channelId }));

  if (!data) {
    return <div className={channelProfileStyle.loadError}>채널 정보를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className={channelProfileStyle.container}>
      <div className={channelProfileStyle.image}>
        <ChannelImage
          channelId={data.id}
          channelName={data.name}
        />
      </div>
      <div className={channelProfileStyle.info}>
        <div className={channelProfileStyle.name}>
          {data.name}
        </div>
        <div>
          {data.description}
        </div>
        <div>
          가입일
          {' '}
          {formatDateString(data.createdDate)}
        </div>
      </div>
    </div>
  );
}
