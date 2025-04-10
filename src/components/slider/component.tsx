'use client';

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
  if (max <= 0) {
    return (
      <div className={styles.container}>
        <div
          className={styles.progressbar}
          style={{ backgroundColor: 'var(--gray)' }}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.progressbar}
        style={{
          background: `linear-gradient(to right, var(--blue),
          var(--blue) ${(value / max) * 100}%,
          var(--lightgray) ${(value / max) * 100}%,
          var(--lightgray) ${mid ? mid : 0}%,
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
