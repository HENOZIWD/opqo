import AccessTokenWrapper from '@/wrappers/accessTokenWrapper';
import styles from './page.module.css';
import CreateChannelForm from '@/components/createChannelForm/component';

export default function CreateChannelPage() {
  return (
    <main>
      <h1 className={styles.title}>채널 생성</h1>
      <AccessTokenWrapper render={(accessToken) => (
        <CreateChannelForm accessToken={accessToken} />
      )}
      />
    </main>
  );
}
