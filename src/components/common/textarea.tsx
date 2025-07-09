import { textareaStyle } from '@/styles/common/inputStyle.css';
import { ChangeEvent, TextareaHTMLAttributes, useRef, useState } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  defaultValueLength?: number;
  autoTrim?: boolean;
  error?: boolean;
}

export default function Textarea({
  defaultValueLength,
  autoTrim,
  error = false,
  ...props
}: TextareaProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentLength, setCurrentLength] = useState<number>(defaultValueLength ?? 0);

  const resizeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    if (wrapperRef.current) {
      wrapperRef.current.scrollIntoView({ block: 'end' });
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={textareaStyle.wrapper}
    >
      <textarea
        {...props}
        className={`${textareaStyle.container}${error ? ` ${textareaStyle.error}` : ''}`}
        onChange={(e) => {
          setCurrentLength(e.currentTarget.value.length);
          resizeTextarea(e);
          props.onChange?.(e);
        }}
        onBlur={(e) => {
          if (autoTrim) {
            const trimmed = e.currentTarget.value.trim();
            e.currentTarget.value = trimmed;
            setCurrentLength(trimmed.length);
          }
          props.onBlur?.(e);
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
