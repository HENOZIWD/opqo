import SignupForm from '@/components/signupForm/component';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = { title: '회원가입' };

export default function SignupPage() {
  return (
    <main>
      <h1 className={styles.title}>회원가입</h1>
      <SignupForm />
    </main>
  );
}
