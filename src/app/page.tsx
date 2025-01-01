import ChannelProfile from '@/components/channelProfile/component';

export default function Home() {
  return (
    <div>
      <ChannelProfile
        icon="/next.svg"
        name="채널 이름"
        subscriberCount="100"
        description="채널 설명"
        created="2024-12-31"
      />
    </div>
  );
}
