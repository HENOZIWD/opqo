import { ChangeEventHandler } from 'react';
import styles from './style.module.css';

interface SliderProps {
  min: number;
  max: number;
  step: number | 'any';
  value: number | string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  mouseDownAction?: () => void;
  mouseUpAction?: () => void;
}

export default function Slider({
  min,
  max,
  step,
  value,
  onChange,
  mouseDownAction,
  mouseUpAction,
}: SliderProps) {
  return (
    <div className={styles.container}>
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
      <div className={styles.progressBar} />
    </div>
  );
}
