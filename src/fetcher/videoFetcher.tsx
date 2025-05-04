import VideoPlayer from '@/components/video/videoPlayer';
import ChannelImage from '@/components/channel/channelImage';
import Link from 'next/link';
import { getVideoInfo } from '@/apis/video';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { formatDateTimeString } from '@/utils/date';
import { videoPageStyle } from '@/styles/video.css';

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
      <div className={videoPageStyle.content}>
        <h1 className={videoPageStyle.title}>
          {data.title}
        </h1>
        {data
          ? (
            <div className={videoPageStyle.channelSection}>
              <div className={videoPageStyle.channelImage}>
                <ChannelImage
                  channelId={data.channel.id}
                  channelName={data.channel.name}
                />
              </div>
              <Link
                className={videoPageStyle.channelName}
                href={`/channel/${data.channel.id}`}
              >
                {data.channel.name}
              </Link>
            </div>
          )
          : null}
        <div className={videoPageStyle.description}>
          <div>{formatDateTimeString(data.createdDate)}</div>
          <div>{data.description}</div>
        </div>
      </div>
    </div>
  );
}
