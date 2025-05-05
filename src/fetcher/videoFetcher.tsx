import VideoPlayer from '@/components/video/videoPlayer';
import { getVideoInfo } from '@/apis/video';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { videoPageStyle } from '@/styles/video.css';
import VideoInfo from '@/components/video/videoInfo';

interface VideoFetcherProps { videoId: string }

export default async function VideoFetcher({ videoId }: VideoFetcherProps) {
  const { data } = await fetchHandlerWithServerComponent(() => getVideoInfo({ videoId }));

  if (!data) {
    return <div className={videoPageStyle.loadError}>동영상을 불러오지 못했습니다.</div>;
  }

  return (
    <div>
      <div className={videoPageStyle.video}>
        <VideoPlayer
          source={`${process.env.NEXT_PUBLIC_CDN_VIDEO_URL}/${data.id}`}
          title={data.title}
          thumbnail={`${process.env.NEXT_PUBLIC_CDN_THUMBNAIL_URL}/${data.id}`}
        />
      </div>
      <VideoInfo
        title={data.title}
        description={data.description}
        createdDate={data.createdDate}
        channelId={data.channel.id}
        channelName={data.channel.name}
      />
    </div>
  );
}
