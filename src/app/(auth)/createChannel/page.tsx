import { Metadata } from 'next';
import CreateChannelForm from '@/components/createChannelForm/component';
import { commonStyle } from '@/styles/common.css';

export const metadata: Metadata = { title: '채널 생성' };

export default function CreateChannelPage() {
  return (
    <main>
      <h1 className={commonStyle.pageTitle}>채널 생성</h1>
      <CreateChannelForm />
    </main>
  );
}
