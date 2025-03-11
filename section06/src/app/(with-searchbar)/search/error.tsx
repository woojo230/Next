'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ErrorParams {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorParams) {
  const router = useRouter();

  useEffect(() => {
    console.log(error.message);
  }, [error]);

  return (
    <div>
      <h3>오류 발생</h3>
      <button
        onClick={() => {
          router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트들을 다시 불러옴
          reset(); // 에러 상태를 초기화, 컴포넌트들을 다시 랜더링
        }}
      >
        다시시도
      </button>
    </div>
  );
}
