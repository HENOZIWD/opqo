import Header from '@/components/layout/header';
import { mainLayoutStyle } from '@/styles/layout.css';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className={mainLayoutStyle.content}>
        {children}
      </div>
    </>
  );
}
