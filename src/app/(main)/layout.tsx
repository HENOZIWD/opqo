import Header from '@/components/header/component';
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
