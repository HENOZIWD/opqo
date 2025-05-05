import { spinnerStyle } from '@/styles/video.css';

export default function Spinner() {
  return (
    <svg
      className={spinnerStyle.container}
      viewBox="0 0 50 50"
    >
      <circle
        className={spinnerStyle.path}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      >
      </circle>
    </svg>
  );
}
