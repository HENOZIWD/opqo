import AccessTokenWrapper from '@/wrappers/accessTokenWrapper';
import styles from './page.module.css';
import UploadVideoForm from './uploadVideoForm/component';

export default function UploadVideoPage() {
  return (
    <main>
      <h1 className={styles.title}>동영상 업로드</h1>
      <AccessTokenWrapper render={(accessToken) =>
        <UploadVideoForm accessToken={accessToken} />}
      />
    </main>
  );
}
