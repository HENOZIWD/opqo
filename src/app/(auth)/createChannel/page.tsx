import { Metadata } from 'next';
import { pageStyle } from '@/styles/common.css';
import CreateChannelForm from './modules/components/createChannelForm';

export const metadata: Metadata = { title: '채널 생성' };

export default function CreateChannelPage() {
  return (
    <main>
      <h1 className={pageStyle.pageTitle}>채널 생성</h1>
      <CreateChannelForm />
    </main>
  );
}
