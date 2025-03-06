import { BookData } from '@/types';
import style from './page.module.css';

interface BookParams {
  id: string | string[];
}

interface PageProps {
  params: BookParams;
}

export default async function Page({ params }: PageProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`
  );
  if (!response.ok) {
    return <div>오류다 이자식아아</div>;
  }
  const bookData: BookData = await response.json();

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    bookData;

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
