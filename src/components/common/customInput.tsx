import { InputHTMLAttributes } from 'react';
import { inputStyle } from '@/styles/common.css';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> { error?: boolean }

export default function CustomInput({
  error = false,
  ...props
}: CustomInputProps) {
  return (
    <input
      className={`${inputStyle.container}${error ? ` ${inputStyle.error}` : ''}`}
      {...props}
    />
  );
}
