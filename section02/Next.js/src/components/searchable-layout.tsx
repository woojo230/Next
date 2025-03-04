import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import style from './searchable-layout.module.css';

interface SearchableLayoutProps {
  children: ReactNode;
}
export default function SearchableLayout({ children }: SearchableLayoutProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || '');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          type="text"
          placeholder="검색어 입력"
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
