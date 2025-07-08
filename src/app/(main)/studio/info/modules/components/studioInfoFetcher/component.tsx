import { getAccessTokenCookie } from '@/serverActions/token';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import StudioInfo from '../studioInfo/component';
import { studioInfoStyle } from '../studioInfo/style.css';
import { getStudioInfo } from '../../apis/getStudioInfo';

export default async function StudioInfoFetcher() {
  const accessToken = (await getAccessTokenCookie()) ?? null;
  const { data } = await fetchHandlerWithServerComponent(() => getStudioInfo({ accessToken }));

  if (!data) {
    return <div className={studioInfoStyle.loadError}>스튜디오 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <StudioInfo
      email={data.email}
      name={data.name}
      description={data.description}
      createdDate={data.createdDate}
      picture={data.picture}
    />
  );
}
