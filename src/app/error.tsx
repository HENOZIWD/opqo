'use client';

import { pageStyle } from '@/styles/common.css';
import { buttonStyle } from '@/styles/common/buttonStyle.css';

export default function GlobalError({ reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={pageStyle.errorPage}>
      <h2>페이지 로드 중 오류가 발생했습니다.</h2>
      <button
        className={buttonStyle.default}
        type="button"
        onClick={() => reset()}
      >
        재시도
      </button>
    </div>
  );
}
