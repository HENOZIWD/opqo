import { Metadata } from 'next';
import styles from './page.module.css';
import CreateChannelForm from '@/components/createChannelForm/component';

export const metadata: Metadata = {
  title: '채널 생성',
  description: '채널을 만들고 다양한 콘텐츠를 공유해보세요!',
};

export default function CreateChannelPage() {
  return (
    <main>
      <h1 className={styles.title}>채널 생성</h1>
      <CreateChannelForm />
    </main>
  );
}
