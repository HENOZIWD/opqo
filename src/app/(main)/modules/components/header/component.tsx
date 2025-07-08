import Link from 'next/link';
import AuthTopBar from '../authTopBar/component';
import { getUserDataFromAccessToken } from '../../serverActions/token';
import { headerStyle } from './style.css';

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
