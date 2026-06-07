import { ReactNode } from 'react';
import { useLocation } from '@tanstack/react-router';
import { Header } from './Header';
import { MinimalHeader } from './MinimalHeader';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout = ({ children, className = '' }: LayoutProps) => {
  const location = useLocation();
  const isPostDetailPage = location.pathname.startsWith('/posts/') && location.pathname !== '/posts';

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950">
      {isPostDetailPage ? <MinimalHeader /> : <Header />}

      <main className={`flex-grow ${isPostDetailPage ? 'pt-16' : ''} ${className}`}>
        {children}
      </main>

      <Footer />
    </div>
  );
};