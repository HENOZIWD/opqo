import { textareaStyle } from '@/styles/common.css';
import { ChangeEvent, TextareaHTMLAttributes, useState } from 'react';

interface CustomTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { error?: boolean }

export default function CustomTextarea({
  error = false,
  ...props
}: CustomTextareaProps) {
  const [currentLength, setCurrentLength] = useState<number>(() => {
    if (typeof props.defaultValue === 'string') {
      return props.defaultValue.length;
    }

    return 0;
  });

  const resizeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className={textareaStyle.wrapper}>
      <textarea
        {...props}
        className={`${textareaStyle.container}${error ? ` ${textareaStyle.error}` : ''}`}
        onChange={(e) => {
          setCurrentLength(e.currentTarget.value.length);
          resizeTextarea(e);
          props.onChange?.(e);
        }}
      />
      {props.maxLength
        ? (
          <div className={textareaStyle.counter}>
            {`${currentLength} / ${props.maxLength}`}
          </div>
        )
        : null}
    </div>
  );
}
