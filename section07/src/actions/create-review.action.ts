'use server';

import { revalidateTag } from 'next/cache';

export async function createReviewAction(formdata: FormData) {
  const content = formdata.get('content')?.toString();
  const author = formdata.get('author')?.toString();
  const bookId = formdata.get('bookId')?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    console.log(response.status);
    revalidateTag(`review-${bookId}`);
  } catch (err) {
    console.error(err);
    return;
  }
}
