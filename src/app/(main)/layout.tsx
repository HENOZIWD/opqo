import Header from '@/components/header/component';
import { mainLayoutContentStyle } from '../common.css';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className={mainLayoutContentStyle}>
        {children}
      </div>
    </>
  );
}
