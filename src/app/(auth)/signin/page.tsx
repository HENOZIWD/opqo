import { Metadata } from 'next';
import { pageStyle } from '@/styles/common.css';
import SigninForm from './modules/components/signinForm';

export const metadata: Metadata = {
  title: '로그인',
  description: '계정에 로그인하고 더 많은 기능을 즐겨보세요!',
};

export default function SigninPage() {
  return (
    <main>
      <h1 className={pageStyle.pageTitle}>로그인</h1>
      <SigninForm />
    </main>
  );
}
