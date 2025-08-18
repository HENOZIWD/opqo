import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { videoPageStyle } from '../styles/videoPageStyle.css';
import VideoInfo from './videoInfo';
import { getVideoInfo } from '../apis/getVideoInfo';
import VideoPlayer from '@/components/video/videoPlayer';
import VideoPlayerStateProvider from '@/components/video/videoPlayerStateProvider';
import { getAccessTokenCookie } from '@/serverActions/token';
import WatchHistoryUpdater from './watchHistoryUpdater';
import CommentUploader from './commentUploader';
import CommentList from './commentList';
import { getCommentList } from '../apis/getCommentList';

interface VideoFetcherProps { videoId: string }

export default async function VideoFetcher({ videoId }: VideoFetcherProps) {
  const accessToken = (await getAccessTokenCookie()) ?? null;
  const { data } = await fetchHandlerWithServerComponent(() => getVideoInfo({
    accessToken,
    videoId,
  }));

  const { data: commentData } = await fetchHandlerWithServerComponent(() => getCommentList({
    accessToken,
    videoId,
  }));

  if (!data) {
    return <div className={videoPageStyle.loadError}>동영상을 불러오지 못했습니다.</div>;
  }

  return (
    <div>
      <div className={videoPageStyle.video}>
        <VideoPlayerStateProvider>
          {accessToken
            ? (
              <WatchHistoryUpdater
                videoId={data.id}
                prevWatchProgress={data.watchProgress ?? 0}
              />
            )
            : null}
          <VideoPlayer
            source={`${process.env.NEXT_PUBLIC_CDN_VIDEO_URL}/${data.id}/master.m3u8`}
            title={data.title}
            thumbnail={`${process.env.NEXT_PUBLIC_CDN_VIDEO_URL}/${data.id}/thumbnail.webp`}
            duration={data.duration}
            hlsMode
            watchProgress={data.watchProgress ?? 0}
          />
        </VideoPlayerStateProvider>
      </div>
      <VideoInfo
        title={data.title}
        description={data.description}
        createdDate={data.createdDate}
        channelId={data.channel.id}
        channelName={data.channel.name}
        channelImage={data.channel.picture}
      />
      {accessToken ? <CommentUploader videoId={data.id} /> : null}
      <CommentList data={commentData} />
    </div>
  );
}
