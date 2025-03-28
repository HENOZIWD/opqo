import Link from 'next/link';
import styles from './style.module.css';
import AuthTopBar from '../authTopBar/component';

export default function Header() {
  return (
    <header className={styles.container}>
      <Link
        href="/"
        prefetch={false}
        className={styles.logo}
      >
        OpqO
      </Link>
      <AuthTopBar />
    </header>
  );
}
