import { BookData } from '@/types';
import { promises } from 'dns';

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = 'https://onebite-books-server-main-sand-rho.vercel.app/book';

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
