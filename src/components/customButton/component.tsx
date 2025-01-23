'use client';

import styles from './style.module.css';

interface ButtonProps {
  type: 'button' | 'submit';
  content: string;
  clickAction?: () => void;
  disabled?: boolean;
  size?: 'default' | 'small';
}

export default function CustomButton({
  type,
  content,
  clickAction,
  disabled = false,
  size = 'default',
}: ButtonProps) {
  if (disabled) {
    return (
      <button
        type="button"
        className={`${styles.button}${size === 'small' ? ` ${styles.small}` : ''}`}
        disabled
      >
        {content}
      </button>
    );
  }

  return (
    <button
      type={type}
      className={`${styles.button}${size === 'small' ? ` ${styles.small}` : ''}`}
      onClick={() => { clickAction?.(); }}
    >
      {content}
    </button>
  );
}
