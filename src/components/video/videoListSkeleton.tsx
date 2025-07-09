import { videoListStyle } from '@/styles/video/videoListStyle.css';
import { videoListSkeletonStyle } from '@/styles/video/videoListSkeletonStyle.css';

export default function VideoListSkeleton() {
  return (
    <div className={videoListStyle.list}>
      <div className={videoListStyle.card}>
        <div className={videoListSkeletonStyle.container}>
          <div className={videoListSkeletonStyle.thumbnail} />
          <div className={videoListSkeletonStyle.text} />
          <div className={videoListSkeletonStyle.text} />
        </div>
      </div>
      <div className={videoListStyle.card}>
        <div className={videoListSkeletonStyle.container}>
          <div className={videoListSkeletonStyle.thumbnail} />
          <div className={videoListSkeletonStyle.text} />
          <div className={videoListSkeletonStyle.text} />
        </div>
      </div>
      <div className={videoListStyle.card}>
        <div className={videoListSkeletonStyle.container}>
          <div className={videoListSkeletonStyle.thumbnail} />
          <div className={videoListSkeletonStyle.text} />
          <div className={videoListSkeletonStyle.text} />
        </div>
      </div>
    </div>
  );
}
