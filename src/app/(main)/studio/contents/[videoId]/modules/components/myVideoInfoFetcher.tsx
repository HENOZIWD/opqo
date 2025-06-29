import { getAccessTokenCookie } from '@/serverActions/token';
import { fetchHandlerWithServerComponent } from '@/utils/handler';

import MyVideoInfo from './myVideoInfo';
import { getMyVideoInfo } from '../apis/getMyVideoInfo';

interface MyVideoInfoFetcherProps { id: string }

export default async function MyVideoInfoFetcher({ id }: MyVideoInfoFetcherProps) {
  const accessToken = (await getAccessTokenCookie()) ?? null;
  const { data } = await fetchHandlerWithServerComponent(() => getMyVideoInfo({
    accessToken,
    id,
  }));

  if (!data) {
    return <div>동영상 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <MyVideoInfo
      id={id}
      width={data.width}
      height={data.height}
      duration={data.duration}
      size={data.size}
      extension={data.extension}
      createdDate={data.createdDate}
      title={data.title}
      description={data.description}
      isUploaded={data.isUploaded}
    />
  );
}
