import { getAccessTokenCookie } from '@/serverActions/token';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { getMyVideoMetadata, getVideoInfo } from '@/apis/video';
import MyVideoInfo from '@/components/myVideoInfo/component';

interface MyVideoInfoFetcherProps { id: string }

export default async function MyVideoInfoFetcher({ id }: MyVideoInfoFetcherProps) {
  const accessToken = (await getAccessTokenCookie()) ?? null;
  const { data: videoMetadata } = await fetchHandlerWithServerComponent(() => getMyVideoMetadata({
    accessToken,
    id,
  }));
  const { data: videoData } = await fetchHandlerWithServerComponent(() => getVideoInfo({ videoId: id }));

  if (!videoMetadata || !videoData) {
    return <div>동영상 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <MyVideoInfo
      id={id}
      width={videoMetadata.width}
      height={videoMetadata.height}
      duration={videoMetadata.duration}
      size={videoMetadata.size}
      extension={videoMetadata.extension}
      status={videoMetadata.status}
      createdDate={videoMetadata.createdDate}
      title={videoData.title}
      description={videoData.description}
    />
  );
}
