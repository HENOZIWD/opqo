import styles from './style.module.css';

interface ProgressBarProps {
  current: number;
  max: number;
}

export default function ProgressBar({
  current,
  max,
}: ProgressBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.max}>
        <div
          className={styles.current}
          style={{ width: `${(current / max) * 100}%` }}
        />
      </div>
      <div className={styles.text}>
        {((current / max) * 100).toFixed(0)}
        %
      </div>
    </div>
  );
}
