import { getMyChannelInfo } from '@/apis/channel';
import StudioInfo from '@/components/studio/studioInfo';
import { getAccessTokenCookie } from '@/serverActions/token';
import { studioInfoStyle } from '@/styles/studio.css';
import { fetchHandlerWithServerComponent } from '@/utils/handler';

export default async function StudioInfoFetcher() {
  const accessToken = (await getAccessTokenCookie()) ?? null;
  const { data } = await fetchHandlerWithServerComponent(() => getMyChannelInfo({ accessToken }));

  if (!data) {
    return <div className={studioInfoStyle.loadError}>스튜디오 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <StudioInfo
      id={data.id}
      name={data.name}
      description={data.description}
      createdDate={data.createdDate}
    />
  );
}
