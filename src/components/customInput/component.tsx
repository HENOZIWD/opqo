import { InputHTMLAttributes } from 'react';
import styles from './style.module.css';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface CustomInputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  register: UseFormRegister<T>;
}

export default function CustomInput<T extends FieldValues>({ name, register, ...props }: CustomInputProps<T>) {
  return (
    <div className={styles.container}>
      <input className={styles.input} {...props} {...register(name)} />
    </div>
  );
}
