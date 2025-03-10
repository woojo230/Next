import { BookData } from '@/types';
import style from './page.module.css';
import { notFound } from 'next/navigation';

interface BookParams {
  id: string | string[];
}

interface PageProps {
  params: Promise<BookParams>;
}

// export const dynamicParams = flase; // 프리패칭 되지 않은 페이지를 실시간으로 생성해주는 함수
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
  }
  const bookData: BookData = await response.json();

  const {
    id: bookId,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  } = bookData;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
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
