export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // App router에서는 쿼리 스트링이나 쿼리 파라미터와 같은 경로상의 포함되는 값들은 page 컴포넌트의 props로서 전달됨
  const { q } = await searchParams;
  console.log(q);

  return <div>search page : {q}</div>;
}
