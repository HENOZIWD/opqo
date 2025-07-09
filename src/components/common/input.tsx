import { inputStyle } from '@/styles/common/inputStyle.css';
import { InputHTMLAttributes, useState } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  defaultValueLength?: number;
  autoTrim?: boolean;
  error?: boolean;
}

export default function Input({
  defaultValueLength,
  autoTrim,
  error = false,
  ...props
}: InputProps) {
  const [currentLength, setCurrentLength] = useState<number>(defaultValueLength ?? 0);

  return (
    <div className={inputStyle.wrapper}>
      <input
        {...props}
        type="text"
        className={`${inputStyle.container}${error ? ` ${inputStyle.error}` : ''}`}
        onChange={(e) => {
          setCurrentLength(e.currentTarget.value.length);
          props.onChange?.(e);
        }}
        onBlur={(e) => {
          if (autoTrim) {
            const trimmed = e.currentTarget.value.trim();
            e.currentTarget.value = trimmed;
            setCurrentLength(trimmed.length);
          }
          props.onBlur?.(e);
        }}
      />
      {props.maxLength
        ? (
          <div className={inputStyle.counter}>
            {`${currentLength} / ${props.maxLength}`}
          </div>
        )
        : null}
    </div>
  );
}
