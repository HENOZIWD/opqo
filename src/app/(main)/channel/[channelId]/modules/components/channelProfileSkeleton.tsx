import { channelProfileSkeletonStyle } from '../styles/channelProfileSkeletonStyle.css';
import { channelProfileStyle } from '../styles/channelProfileStyle.css';

export default function ChannelProfileSkeleton() {
  return (
    <div className={channelProfileStyle.container}>
      <div className={channelProfileSkeletonStyle.image} />
      <div className={channelProfileStyle.info}>
        <div className={channelProfileSkeletonStyle.text} />
        <div className={channelProfileSkeletonStyle.text} />
        <div className={channelProfileSkeletonStyle.text} />
      </div>
    </div>
  );
}
