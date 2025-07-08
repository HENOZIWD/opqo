import VideoPlayer from '@/components/video/videoPlayer';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { videoFetcherStyle } from './style.css';
import { getVideoInfo } from '../../apis/getVideoInfo';
import VideoInfo from '../videoInfo/component';

interface VideoFetcherProps { videoId: string }

export default async function VideoFetcher({ videoId }: VideoFetcherProps) {
  const { data } = await fetchHandlerWithServerComponent(() => getVideoInfo({ videoId }));

  if (!data) {
    return <div className={videoFetcherStyle.loadError}>동영상을 불러오지 못했습니다.</div>;
  }

  return (
    <div>
      <div className={videoFetcherStyle.video}>
        <VideoPlayer
          source={`${process.env.NEXT_PUBLIC_CDN_VIDEO_URL}/${data.id}/master.m3u8`}
          title={data.title}
          thumbnail={`${process.env.NEXT_PUBLIC_CDN_VIDEO_URL}/${data.id}/thumbnail.webp`}
          duration={data.duration}
          hlsMode
        />
      </div>
      <VideoInfo
        title={data.title}
        description={data.description}
        createdDate={data.createdDate}
        channelId={data.channel.id}
        channelName={data.channel.name}
        channelImage={data.channel.picture}
      />
    </div>
  );
}
