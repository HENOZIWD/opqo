import ChannelProfile from '@/components/channelProfile/component';

export default function Home() {
  return (
    <div>
      <ChannelProfile
        icon="/next.svg"
        name="ChannelName"
        subscriberCount="100"
        description="Channel description"
        created="2024-12-31"
      />
    </div>
  );
}
