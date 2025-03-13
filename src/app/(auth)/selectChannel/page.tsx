'use client';

import styles from './page.module.css';
import CustomLink from '@/components/customLink/component';
import PrivateRoute from '@/boundary/privateRoute';
import MyChannelListFetcher from '@/fetcher/myChannelListFetcher/component';

export default function SelectChannelPage() {
  return (
    <PrivateRoute level="user">
      <main>
        <h1 className={styles.title}>채널 선택</h1>
        <MyChannelListFetcher />
        <CustomLink href="/createChannel">
          새로운 채널 생성
        </CustomLink>
      </main>
    </PrivateRoute>
  );
}
