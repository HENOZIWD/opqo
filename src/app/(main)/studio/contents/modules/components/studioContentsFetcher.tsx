import { getAccessTokenCookie } from '@/serverActions/token';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { videoListStyle } from '@/styles/video.css';
import { getMyVideoList } from '../apis/getMyVideoList';
import StudioContentCard from './studioContentCard';

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
          title,
          status,
          createdDate,
        }) => (
          <li
            className={videoListStyle.card}
            key={id}
          >
            <StudioContentCard
              id={id}
              title={title}
              status={status}
              createdDate={createdDate}
            />
          </li>
        ))
        : <li className={videoListStyle.fallback}>업로드 한 동영상이 없습니다.</li>}
    </ul>
  );
}
