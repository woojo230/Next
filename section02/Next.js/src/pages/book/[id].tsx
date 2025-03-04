import { useRouter } from 'next/router';
import style from './[id].module.css';
import {
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next';
import fetchOneBooks from '@/lib/fetch-one-books';
import { notFound } from 'next/navigation';

// SSR
// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const id = context.params!.id;
//   const book = await fetchOneBooks(Number(id));

//   return {
//     props: { book },
//   };
// };

// SSG
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } }, // url 파라미터의 값들은 Next 문법상 반드시 string 으로 설정해야함
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    // ↓: fallback(SSG) 옵션들
    fallback: true,
    // false: 404 NotFound
    // blocking: SSR 방식으로 실시간 페이지 생성(사전 랜더링)
    // true: fallback 상태의 페이지(Props 데이터가 없는 상태의 페이지)부터 생성해 보내 줌
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBooks(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

// 동적인 URL 파라미터를 사용하는 페이지에서는 [name].tsx 형식으로 파일 생성
export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // const router = useRouter();
  // const queryString = router.query.id;
  // console.log(queryString);

  const router = useRouter();

  if (router.isFallback) return '로딩중';

  if (!book) {
    return '문제발생! 공습경보!';
  }

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} alt="backgroundImg" />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
