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
        className={`${size === 'small' ? styles.small : styles.button}`}
        disabled
      >
        {content}
      </button>
    );
  }

  return (
    <button
      type={type}
      className={`${size === 'small' ? styles.small : styles.button}`}
      onClick={() => { clickAction?.(); }}
    >
      {content}
    </button>
  );
}
