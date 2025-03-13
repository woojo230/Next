import { BookData, ReviewData } from '@/types';
import style from './page.module.css';
import { notFound } from 'next/navigation';
import ReviewItem from '@/components/review-item';
import ReviewEditor from '@/components/review-editor';

interface BookParams {
  id: string;
}

interface PageProps {
  params: Promise<BookParams>;
}

// export const dynamicParams = flase; // 프리패칭 되지 않은 페이지를 실시간으로 생성해주는 함수
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

async function BookDetail({ bookIdParams }: { bookIdParams: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookIdParams}`
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
    <section>
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
    </section>
  );
}

async function ReviewList({ bookIdParams }: { bookIdParams: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookIdParams}`
  );

  if (!response.ok) {
    throw new Error('review fetch failed');
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookIdParams={id} />
      <ReviewEditor bookIdParams={id} />
      <ReviewList bookIdParams={id} />
    </div>
  );
}
