import { fetchHandlerWithServerComponent } from '@/utils/handler';
import VideoCard from '@/components/video/videoCard';
import { videoListStyle } from '@/styles/video/videoListStyle.css';
import { getVideoList } from '../apis/getVideoList';
import { getAccessTokenCookie } from '@/serverActions/token';

export default async function VideoListFetcher() {
  const accessToken = (await getAccessTokenCookie()) ?? null;
  const { data } = await fetchHandlerWithServerComponent(() => getVideoList({ accessToken }));

  if (!data) {
    return <div className={videoListStyle.fallback}>동영상 목록을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <ul className={videoListStyle.list}>
      {data.length > 0
        ? data.map(({
          id,
          title,
          createdDate,
          duration,
          channel,
          watchProgress,
        }) => (
          <li
            key={id}
            className={videoListStyle.card}
          >
            <VideoCard
              videoId={id}
              videoTitle={title}
              videoDuration={duration}
              createdDate={createdDate}
              channelInfo={channel}
              watchProgress={watchProgress}
            />
          </li>
        ))
        : <li className={videoListStyle.fallback}>업로드 된 동영상이 없습니다.</li>}
    </ul>
  );
}
