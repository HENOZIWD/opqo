import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { videoListStyle } from '@/styles/video/videoListStyle.css';
import { getLiveStreamList } from '../apis/getLiveStreamList';
import LiveCard from '@/components/video/liveCard';

export default async function LiveStreamListFetcher() {
  const { data } = await fetchHandlerWithServerComponent(() => getLiveStreamList());

  if (!data) {
    return <div className={videoListStyle.fallback}>동영상 목록을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <ul className={videoListStyle.list}>
      {data.length > 0
        ? data.map(({
          userId,
          title,
          viewerCount,
          user,
        }) => (
          <li
            key={userId}
            className={videoListStyle.card}
          >
            <LiveCard
              channelId={userId}
              title={title}
              viewerCount={viewerCount}
              user={user}
            />
          </li>
        ))
        : <li className={videoListStyle.fallback}>라이브 스트리밍 중인 방송이 없습니다.</li>}
    </ul>
  );
}
