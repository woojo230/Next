import GlobalLayout from '@/components/global-layout';
import SearchableLayout from '@/components/searchable-layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link'; // Next에서 제공해주는 Link 기능 활용해서 페이지 이동 추천
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: NextPageWithLayout }) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
