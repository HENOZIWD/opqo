'use client';

import styles from './error.module.css';
import CustomButton from '@/components/customButton/component';

export default function GlobalError({ reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.container}>
      <h2>페이지 로드 중 오류가 발생했습니다.</h2>
      <CustomButton
        type="button"
        clickAction={() => reset()}
        content="재시도"
      />
    </div>
  );
}
