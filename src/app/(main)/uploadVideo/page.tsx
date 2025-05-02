import { Metadata } from 'next';
import UploadVideoForm from '@/components/uploadVideoForm/component';
import { pageTitleStyle } from '@/app/common.css';

export const metadata: Metadata = { title: '동영상 업로드' };

export default function UploadVideoPage() {
  return (
    <main>
      <h1 className={pageTitleStyle}>동영상 업로드</h1>
      <UploadVideoForm />
    </main>
  );
}
