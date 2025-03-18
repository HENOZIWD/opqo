import { ChangeEventHandler } from 'react';
import styles from './style.module.css';

interface SliderProps {
  min: number;
  max: number;
  step: number | 'any';
  value: number;
  mid?: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  mouseDownAction?: () => void;
  mouseUpAction?: () => void;
}

export default function Slider({
  min,
  max,
  step,
  value,
  mid,
  onChange,
  mouseDownAction,
  mouseUpAction,
}: SliderProps) {
  return (
    <div className={styles.container}>
      <div
        className={styles.progressbar}
        style={{
          background: `linear-gradient(to right, var(--white),
          var(--white) ${(value / max) * 100}%,
          var(--red) ${(value / max) * 100}%,
          var(--red) ${mid ? mid : 0}%,
          var(--gray) ${mid ? mid : 0}%,
          var(--gray) 100%)`,
        }}
      />
      <input
        type="range"
        className={styles.slider}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        onMouseDown={() => mouseDownAction?.()}
        onMouseUp={() => mouseUpAction?.()}
      />
    </div>
  );
}
