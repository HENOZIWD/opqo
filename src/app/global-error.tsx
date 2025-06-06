'use client';

import CustomButton from '@/components/common/customButton';
import { pageStyle } from '@/styles/common.css';

export default function GlobalError({ reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className={pageStyle.errorPage}>
          <h2>페이지 로드 중 오류가 발생했습니다.</h2>
          <CustomButton
            type="button"
            clickAction={() => reset()}
            content="재시도"
          />
        </div>
      </body>
    </html>
  );
}
