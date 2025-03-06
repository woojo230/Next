interface PageParams {
  id: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <div>book/[id] page : {id}</div>;
}
