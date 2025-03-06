import CustomButton from '@/components/customButton/component';
import styles from './style.module.css';

interface ErrorBoundaryFallbackProps { reset: () => void }

export default function ErrorBoundaryFallback({ reset }: ErrorBoundaryFallbackProps) {
  return (
    <div className={styles.container}>
      <div>오류가 발생했습니다.</div>
      <CustomButton
        clickAction={reset}
        type="button"
        content="재시도"
      />
    </div>
  );
}
