import { progressBarStyle } from '@/styles/common.css';

interface ProgressBarProps {
  current: number;
  max: number;
}

export default function ProgressBar({
  current,
  max,
}: ProgressBarProps) {
  return (
    <div className={progressBarStyle.container}>
      <div className={progressBarStyle.background}>
        <div
          className={progressBarStyle.progress}
          style={{ width: `${(current / max) * 100}%` }}
        />
      </div>
      <div className={progressBarStyle.text}>
        {((current / max) * 100).toFixed(0)}
        %
      </div>
    </div>
  );
}
