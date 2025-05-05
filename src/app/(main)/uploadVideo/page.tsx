import { Metadata } from 'next';
import UploadVideoForm from '@/components/form/uploadVideoForm';
import { pageStyle } from '@/styles/common.css';

export const metadata: Metadata = { title: '동영상 업로드' };

export default function UploadVideoPage() {
  return (
    <main>
      <h1 className={pageStyle.pageTitle}>동영상 업로드</h1>
      <UploadVideoForm />
    </main>
  );
}
