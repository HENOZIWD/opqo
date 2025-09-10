import { Metadata } from 'next';
import StreamKeyInfo from './modules/components/streamKeyInfo';
import { pageStyle } from '@/styles/common/pageStyle.css';
import LiveStreamConfigForm from './modules/components/liveStreamConfigForm';
import { getAccessTokenCookie } from '@/serverActions/token';
import { fetchHandlerWithServerComponent } from '@/utils/handler';
import { getLiveStreamConfig } from './modules/apis/getLiveStreamConfig';
import { studioInfoStyle } from '../info/modules/styles/studioInfoStyle.css';
import StreamKeyGuide from './modules/components/streamKeyGuide';

export const metadata: Metadata = { title: '라이브 설정' };

export default async function LiveStreamConfingPage() {
  const accessToken = (await getAccessTokenCookie()) ?? null;
  const { data } = await fetchHandlerWithServerComponent(() => getLiveStreamConfig({ accessToken }));

  if (!data) {
    return <div className={studioInfoStyle.loadError}>라이브 설정을 불러오지 못했습니다.</div>;
  }

  return (
    <main>
      <h1 className={pageStyle.pageTitle}>라이브 설정</h1>
      <LiveStreamConfigForm config={data} />
      <StreamKeyInfo />
      <StreamKeyGuide />
    </main>
  );
}
