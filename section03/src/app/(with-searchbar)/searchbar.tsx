'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <input value={search} onChange={onChangeHandler} />
      <button>검색</button>
    </div>
  );
}
