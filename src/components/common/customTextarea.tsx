import { textareaStyle } from '@/styles/common.css';
import { TextareaHTMLAttributes, useEffect, useRef } from 'react';

interface CustomTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { error?: boolean }

export default function CustomTextarea({
  error = false,
  ...props
}: CustomTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    resizeTextarea();
  }, [props.value]);

  return (
    <textarea
      ref={textareaRef}
      className={`${textareaStyle.container}${error ? ` ${textareaStyle.error}` : ''}`}
      {...props}
    />
  );
}
