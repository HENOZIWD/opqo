import { Metadata } from 'next';
import { pageStyle } from '@/styles/common.css';
import UploadVideoForm from './modules/components/uploadVideoForm';

export const metadata: Metadata = { title: '동영상 업로드' };

export default function UploadVideoPage() {
  return (
    <main>
      <h1 className={pageStyle.pageTitle}>동영상 업로드</h1>
      <UploadVideoForm />
    </main>
  );
}
