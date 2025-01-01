'use client';

import styles from './style.module.css';

interface ButtonProps {
  clickAction: () => void;
  content: string;
}

export default function Button({ content, clickAction }: ButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={clickAction}
    >
      {content}
    </button>
  );
}
