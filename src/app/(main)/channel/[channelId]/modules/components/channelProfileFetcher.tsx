import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { getChannelInfo } from '../apis/getChannelInfo';
import { channelProfileStyle } from '../styles/channelProfileStyle.css';
import ChannelProfile from './channelProfile';

interface ChannelProfileFetcherProps { channelId: string }

export default async function ChannelProfileFetcher({ channelId }: ChannelProfileFetcherProps) {
  const { data } = await fetchHandlerWithServerComponent(() => getChannelInfo({ channelId }));

  if (!data) {
    return <div className={channelProfileStyle.loadError}>채널 정보를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <ChannelProfile
      id={data.id}
      name={data.name}
      description={data.description}
      createdDate={data.createdDate}
    />
  );
}
