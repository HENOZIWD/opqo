import Header from '@/components/header/component';
import styles from './layout.module.css';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className={styles.content}>
        {children}
      </div>
    </>
  );
}
