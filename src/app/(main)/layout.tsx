import Header from '@/components/header/component';
import AuthProvider from '@/contexts/auth';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      {children}
    </AuthProvider>
  );
}
