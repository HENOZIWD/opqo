import CustomLink from '@/components/customLink/component';
import styles from './notFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>페이지가 존재하지 않습니다.</h1>
      <CustomLink href="/">메인 페이지로</CustomLink>
    </div>
  );
}
