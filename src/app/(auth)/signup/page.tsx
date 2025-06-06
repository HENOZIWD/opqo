import SignupForm from '@/components/form/signupForm';
import { Metadata } from 'next';
import { pageStyle } from '@/styles/common.css';

export const metadata: Metadata = {
  title: '회원가입',
  description: '새로운 계정을 만들고 OpqO의 다양한 기능을 이용하세요!',
};

export default function SignupPage() {
  return (
    <main>
      <h1 className={pageStyle.pageTitle}>회원가입</h1>
      <SignupForm />
    </main>
  );
}
