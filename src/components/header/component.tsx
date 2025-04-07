import Link from 'next/link';
import styles from './style.module.css';
import AuthTopBar from '../authTopBar/component';
import { getUserDataFromAccessToken } from '@/serverActions/token';

export default async function Header() {
  const userdata = await getUserDataFromAccessToken();

  return (
    <header className={styles.container}>
      <Link
        href="/"
        prefetch={false}
        className={styles.logo}
      >
        OpqO
      </Link>
      <AuthTopBar auth={userdata} />
    </header>
  );
}
