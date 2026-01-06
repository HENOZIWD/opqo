import { buttonStyle } from '@/styles/common/buttonStyle.css';
import { pageStyle } from '@/styles/common/pageStyle.css';
import Link from 'next/link';

export default function LoginErrorPage() {
  return (
    <div className={pageStyle.errorPage}>
      <h2>로그인에 실패했습니다.</h2>
      <p>잠시 후 다시 시도해주세요.</p>
      <Link
        href="/"
        className={buttonStyle.default}
        type="button"
      >
        메인 페이지로
      </Link>
    </div>
  );
}
