import { buttonStyle } from '@/styles/common/button.css';
import { pageStyle } from '@/styles/common/page.css';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={pageStyle.errorPage}>
      <h1>페이지가 존재하지 않습니다.</h1>
      <Link
        className={buttonStyle.default}
        href="/"
      >
        메인 페이지로
      </Link>
    </div>
  );
}
