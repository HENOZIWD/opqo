import Header from '@/components/header/component';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'OpqO' };

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
