'use client';

import styles from './style.module.css';

interface ButtonProps {
  type: 'button' | 'submit';
  clickAction?: () => void;
  content: string;
}

export default function CustomButton({ type, content, clickAction }: ButtonProps) {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={() => { clickAction?.(); }}
    >
      {content}
    </button>
  );
}
