import Header from './modules/components/header';
import { mainLayoutStyle } from './modules/styles/mainLayoutStyle.css';

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
