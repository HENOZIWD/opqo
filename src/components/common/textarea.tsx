import { textareaStyle } from '@/styles/common/inputStyle.css';
import { TextareaHandle } from '@/utils/type';
import { RefCallback, RefObject, TextareaHTMLAttributes, useImperativeHandle, useRef, useState } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  defaultValueLength?: number;
  autoTrim?: boolean;
  error?: boolean;
  ref?: RefCallback<HTMLTextAreaElement>;
  updateRef?: RefObject<TextareaHandle | null>;
}

export default function Textarea({
  defaultValueLength,
  autoTrim,
  error = false,
  ref,
  updateRef,
  ...props
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentLength, setCurrentLength] = useState<number>(defaultValueLength ?? 0);

  const updateTextarea = () => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    setCurrentLength(textarea.value.length);
  };

  useImperativeHandle(updateRef, () => {
    return {
      update() {
        updateTextarea();
      },
    };
  });

  return (
    <div className={textareaStyle.wrapper}>
      <textarea
        {...props}
        ref={(el) => {
          textareaRef.current = el;
          ref?.(el);
        }}
        className={`${textareaStyle.container}${error ? ` ${textareaStyle.error}` : ''}`}
        onChange={(e) => {
          setCurrentLength(e.currentTarget.value.length);
          updateTextarea();
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
