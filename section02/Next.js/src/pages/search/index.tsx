import SearchableLayout from '@/components/searchable-layout';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import BookItem from '@/components/book-item';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetch.books';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // console.log(context);
  const q = context.query.q;
  const books = await fetchBooks(q as string);

  return {
    props: {
      books,
    },
  };
};

export default function Page({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const router = useRouter(); // 쿼리 파라미터 -> 쿼리 스트링 가져올 수 있음
  // const queryString = router.query.q;
  // console.log(queryString);
  console.log(books);

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
