import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { getVideoInfo } from '@/apis/video';
import StudioContentCard from '@/components/studio/studioContentCard';

interface StudioContentCardFetcherProps {
  id: string;
  status: string;
  createdDate: string;
}

export default async function StudioContentCardFetcher({
  id,
  status,
  createdDate,
}: StudioContentCardFetcherProps) {
  const { data } = await fetchHandlerWithServerComponent(() => getVideoInfo({ videoId: id }));

  if (!data) {
    return null;
  }

  return (
    <StudioContentCard
      id={id}
      status={status}
      createdDate={createdDate}
      title={data.title}
    />
  );
}
