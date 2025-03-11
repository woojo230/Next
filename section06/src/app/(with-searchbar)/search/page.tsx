import BookItem from '@/components/book-item';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { BookData } from '@/types';
import { delay } from '@/utils/delay';
import { Suspense } from 'react';

interface SearchParams {
  q?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: 'force-cache' }
  );
  if (!response.ok) {
    return <div>오류가 발생생</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({ searchParams }: PageProps) {
  // await delay(1500);
  const { q } = await searchParams;
  return (
    <Suspense key={q || ''} fallback={<BookListSkeleton count={5} />}>
      <SearchResult q={q || ''}></SearchResult>
    </Suspense>
  );
}
