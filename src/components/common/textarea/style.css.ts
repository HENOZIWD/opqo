import { inputContainerStyle, inputCounterStyle, inputErrorStyle, inputWrapperStyle } from '@/styles/common/input.css';
import { style } from '@vanilla-extract/css';

export const textareaStyle = {
  wrapper: inputWrapperStyle,

  container: style([inputContainerStyle, {
    resize: 'none',
    overflow: 'hidden',
  }]),

  error: inputErrorStyle,
  counter: inputCounterStyle,
};
