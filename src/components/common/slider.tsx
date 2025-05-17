'use client';

import { ChangeEventHandler } from 'react';
import { colorStyleVars, sliderStyle } from '@/styles/common.css';

interface SliderProps {
  name: string;
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
  name,
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
      <div className={sliderStyle.container}>
        <div
          className={sliderStyle.progress}
          style={{ backgroundColor: 'var(--gray)' }}
        />
      </div>
    );
  }

  return (
    <div className={sliderStyle.container}>
      <div
        className={sliderStyle.progress}
        style={{
          background: `linear-gradient(to right, ${colorStyleVars.blue},
          ${colorStyleVars.blue} ${(value / max) * 100}%,
          ${colorStyleVars.lightGray} ${(value / max) * 100}%,
          ${colorStyleVars.lightGray} ${mid ? mid : 0}%,
          ${colorStyleVars.gray} ${mid ? mid : 0}%,
          ${colorStyleVars.gray} 100%)`,
        }}
      />
      <input
        aria-label={name}
        type="range"
        className={sliderStyle.input}
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
