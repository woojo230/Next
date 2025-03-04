import { ReactNode } from 'react';
import SearchBar from './Searchbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <SearchBar />
      {children}
    </div>
  );
}
