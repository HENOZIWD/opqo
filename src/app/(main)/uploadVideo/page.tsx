import { Metadata } from 'next';
import styles from './page.module.css';
import UploadVideoForm from '@/components/uploadVideoForm/component';

export const metadata: Metadata = { title: '동영상 업로드' };

export default function UploadVideoPage() {
  return (
    <main>
      <h1 className={styles.title}>동영상 업로드</h1>
      <UploadVideoForm />
    </main>
  );
}
