'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // 경로 잘 보기, App Router 부터는 next/navigation으로부터 불러옴

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmitHandler = () => {
    router.push(`/search?q=${search}`);
  };
  return (
    <div>
      <input value={search} onChange={onChangeHandler} />
      <button onClick={onSubmitHandler}>검색</button>
    </div>
  );
}
