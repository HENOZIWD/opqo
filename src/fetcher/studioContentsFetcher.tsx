import { getAccessTokenCookie } from '@/serverActions/token';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { getMyVideoList } from '@/apis/video';
import StudioContentCardFetcher from './studioContentCardFetcher';
import { videoListStyle } from '@/styles/video.css';

export default async function StudioContentsFetcher() {
  const accessToken = (await getAccessTokenCookie()) ?? null;
  const { data } = await fetchHandlerWithServerComponent(() => getMyVideoList({ accessToken }));

  if (!data) {
    return <div className={videoListStyle.fallback}>동영상 목록을 불러오지 못했습니다.</div>;
  }

  return (
    <ul className={videoListStyle.list}>
      {data.length > 0
        ? data.map(({
          id,
          status,
          createdDate,
        }) => (
          <li
            className={videoListStyle.card}
            key={id}
          >
            <StudioContentCardFetcher
              id={id}
              status={status}
              createdDate={createdDate}
            />
          </li>
        ))
        : <div className={videoListStyle.fallback}>업로드 한 동영상이 없습니다.</div>}
    </ul>
  );
}
