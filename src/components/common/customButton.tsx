'use client';

import { buttonStyle } from '@/styles/common.css';

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
  if (!disabled) {
    return (
      <button
        type={type}
        className={`${buttonStyle.container}${size === 'small' ? ` ${buttonStyle.small}` : ''}`}
        onClick={() => { clickAction?.(); }}
      >
        {content}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`${buttonStyle.container}${size === 'small' ? ` ${buttonStyle.small}` : ''}`}
      disabled
    >
      {content}
    </button>
  );
}
