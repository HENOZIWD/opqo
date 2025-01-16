import { InputHTMLAttributes } from 'react';
import styles from './style.module.css';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> { error?: boolean }

export default function CustomInput({
  error = false,
  ...props
}: CustomInputProps) {
  return (
    <input className={`${styles.input}${error ? ` ${styles.error}` : ''}`} {...props} />
  );
}
