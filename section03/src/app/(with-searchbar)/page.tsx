import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  console.log('등짝을 보자');

  return <div className={styles.page}>인덱스 페이지</div>;
}
