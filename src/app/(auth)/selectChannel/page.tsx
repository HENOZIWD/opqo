import CustomLink from '@/components/common/customLink';
import MyChannelListFetcher from '@/fetcher/myChannelListFetcher';
import { pageStyle } from '@/styles/common.css';
import { Metadata } from 'next';

export const metadata: Metadata = { title: '채널 선택' };

export default function SelectChannelPage() {
  return (
    <main>
      <h1 className={pageStyle.pageTitle}>채널 선택</h1>
      <MyChannelListFetcher />
      <CustomLink href="/createChannel">
        새로운 채널 생성
      </CustomLink>
    </main>
  );
}
