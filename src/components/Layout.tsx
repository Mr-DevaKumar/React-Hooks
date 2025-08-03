// components/Layout.tsx
// components/Layout.tsx
import type { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app">
      <Navbar />
      <main className="container">{children}</main>
    </div>
  );
};

export default Layout;