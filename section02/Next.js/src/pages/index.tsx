import { ReactNode } from 'react';
import SearchableLayout from '@/components/searchable-layout';
import style from './index.module.css';
import BookItem from '@/components/book-item';
import fetchBooks from '@/lib/fetch.books';
import { InferGetStaticPropsType } from 'next';
import fetchRandomBooks from '@/lib/fetch-random-books';
import Head from 'next/head';

// SSR & SSG
//   // next에서 약속된 이름의 함수, 이 홤수 사용하는 페이지는 SSR 방식으로 작동
//   // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
//   //
//   // getServerSideProps, getStaticProps 함수 사용시 주의할 점
//   // getServerSideProps, getStaticProps 함수는 항상 props라는 객체 프로퍼티를 반환해야함
//   // const data = 'hello';
//   // return {
//   //   props: {
//   //     data,
//   //   },
//   // };

// SSR
// export const getServerSideProps = async () => {
//   // 병렬 데이터 패칭을 위한 비동기 처리
//   const [allBooks, randomBooks] = await Promise.all([
//     fetchBooks(),
//     fetchRandomBooks(),
//   ]);

//   return {
//     props: {
//       allBooks,
//       randomBooks,
//     },
//   };
// };

// SSG
export const getStaticProps = async () => {
  // 병렬 데이터 패칭을 위한 비동기 처리
  const [allBooks, randomBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      randomBooks,
    },
    // ↓: ISR (증분 정적 재생성, 쉽게 말해 일정 시간마다 재생성)
    // revalidate: 3,
  };
};

export default function Home({
  allBooks,
  randomBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(allBooks);

  return (
    <>
      <Head>
        <title>한입 북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {randomBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section></section>
      </div>
    </>
  );
}

// 자바스크립트의 함수는 모두 객체이기 때문에 다음과 같이 매서드도 추가가 가능함
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
