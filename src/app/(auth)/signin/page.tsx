import { Metadata } from 'next';
import styles from './page.module.css';
import SigninForm from '@/components/signinForm/component';

export const metadata: Metadata = { title: '로그인' };

export default function SigninPage() {
  return (
    <main>
      <h1 className={styles.title}>로그인</h1>
      <SigninForm />
    </main>
  );
}
