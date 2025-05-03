'use client';

import CustomButton from '@/components/customButton/component';
import { errorPageStyle } from './common.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={errorPageStyle}>
      <h2>페이지 로드 중 오류가 발생했습니다.</h2>
      <CustomButton
        type="button"
        clickAction={() => reset()}
        content="재시도"
      />
    </div>
  );
}
