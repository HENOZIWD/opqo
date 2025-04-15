import { Metadata } from 'next';
import styles from './page.module.css';
import SigninForm from '@/components/signinForm/component';

export const metadata: Metadata = {
  title: '로그인',
  description: '계정에 로그인하고 더 많은 기능을 즐겨보세요!',
};

export default function SigninPage() {
  return (
    <main>
      <h1 className={styles.title}>로그인</h1>
      <SigninForm />
    </main>
  );
}
