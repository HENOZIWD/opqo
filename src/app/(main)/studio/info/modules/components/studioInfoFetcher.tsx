import { getAccessTokenCookie } from '@/serverActions/token';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import StudioInfo from './studioInfo';
import { getMyChannelInfo } from '../apis/getMyChannelInfo';
import { studioInfoStyle } from '../styles/studioInfoStyle.css';

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
