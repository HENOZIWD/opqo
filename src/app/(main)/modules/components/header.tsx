import Link from 'next/link';
import AuthTopBar from './authTopBar';
import { headerStyle } from '../styles/headerStyle.css';
import { getUserDataFromAccessToken } from '@/serverActions/token';

export default async function Header() {
  const userdata = await getUserDataFromAccessToken();

  return (
    <header className={headerStyle.container}>
      <Link
        href="/"
        prefetch={false}
        className={headerStyle.logo}
      >
        OpqO
      </Link>
      <AuthTopBar auth={userdata} />
    </header>
  );
}
