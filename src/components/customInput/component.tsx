import { InputHTMLAttributes } from 'react';
import styles from './style.module.css';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface CustomInputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
}

export default function CustomInput<T extends FieldValues>({ label, name, register, ...props }: CustomInputProps<T>) {
  return (
    <div className={styles.container}>
      <label
        htmlFor={name}
        className={styles.label}
      >
        {label}
      </label>
      <input
        className={styles.input}
        id={name}
        {...props}
        {...register(name)}
      />
    </div>
  );
}
