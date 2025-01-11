'use client';

import styles from './style.module.css';

interface ButtonProps {
  type: 'button' | 'submit';
  content: string;
  clickAction?: () => void;
  state?: 'default' | 'disabled';
}

export default function CustomButton({
  type,
  content,
  clickAction,
  state = 'default',
}: ButtonProps) {
  if (state === 'default') {
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

  if (state === 'disabled') {
    return (
      <button
        type="button"
        className={styles.button}
        disabled
      >
        {content}
      </button>
    );
  }
}
